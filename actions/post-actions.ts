'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { z } from 'zod';

import { Prisma } from '@/app/generated/prisma/client';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { createPostSchema } from '@/lib/schemas/postSchema';

type CreatePostFieldErrors = z.core.$ZodFlattenedError<
  z.output<typeof createPostSchema>
>['fieldErrors'];

export type CreatePostActionResult =
  | {
      success: true;
      message: string;
      post: {
        id: string;
        slug: string;
      };
    }
  | {
      success: false;
      message: string;
      fieldErrors?: CreatePostFieldErrors;
    };

function createSlug(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

async function createUniquePostSlug(title: string): Promise<string> {
  const baseSlug = createSlug(title) || 'post';
  let slug = baseSlug;
  let suffix = 2;

  while (
    await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    })
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function createPostAction(
  input: unknown
): Promise<CreatePostActionResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      message: 'You must be signed in to create a post.',
    };
  }

  const parsed = createPostSchema.safeParse(input);

  if (!parsed.success) {
    const flattenedErrors = z.flattenError(parsed.error);

    return {
      success: false,
      message: 'Please correct the highlighted fields.',
      fieldErrors: flattenedErrors.fieldErrors,
    };
  }

  const { title, category, headerImg, content, published, tags } = parsed.data;

  try {
    const slug = await createUniquePostSlug(title);

    const normalizedTags = Array.from(
      new Set(tags.map((tag) => tag.trim()).filter(Boolean))
    );

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        category,
        headerImg: headerImg || null,
        content,
        published,
        publishedAt: published ? new Date() : null,
        authorId: session.user.id,
        tags: {
          create: normalizedTags.map((tagName) => {
            const tagSlug = createSlug(tagName);

            return {
              tag: {
                connectOrCreate: {
                  where: { slug: tagSlug },
                  create: {
                    name: tagName,
                    slug: tagSlug,
                  },
                },
              },
            };
          }),
        },
      },
      select: {
        id: true,
        slug: true,
      },
    });

    revalidatePath('/posts');
    revalidatePath('/dashboard/posts');

    return {
      success: true,
      message: published
        ? 'Post published successfully.'
        : 'Draft saved successfully.',
      post,
    };
  } catch (error) {
    console.error('CREATE_POST_ACTION_ERROR', error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        success: false,
        message:
          'A post or tag with the same unique value already exists. Please try again.',
      };
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2003'
    ) {
      return {
        success: false,
        message: 'The signed-in user could not be connected to this post.',
      };
    }

    return {
      success: false,
      message: 'The post could not be created.',
    };
  }
}
