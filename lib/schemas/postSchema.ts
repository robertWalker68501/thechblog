import * as z from 'zod';

export const POST_CATEGORIES = [
  'React',
  'Nextjs',
  'AI',
  'Databases',
  'Tutorials',
  'Uncategorized',
] as const;

export const postCategorySchema = z.enum(POST_CATEGORIES, {
  error: 'Please select a valid category.',
});

export const postTagSchema = z
  .string()
  .trim()
  .min(1, 'Tags cannot be empty.')
  .max(30, 'Each tag cannot exceed 30 characters.')
  .refine((tag) => tag === tag.toLowerCase(), {
    message: 'Tags must be lowercase.',
  })
  .refine((tag) => !/\s/.test(tag), {
    message: 'Tags cannot contain spaces.',
  })
  .regex(
    /^[a-z0-9][a-z0-9.+#-]*$/,
    'Tags may only contain lowercase letters, numbers, periods, plus signs, hashes, and hyphens.'
  )
  .refine((tag) => !tag.endsWith('-') && !tag.endsWith('.'), {
    message: 'Tags cannot end with a period or hyphen.',
  });

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'A post title is required.')
    .min(3, 'The title must contain at least 3 characters.')
    .max(150, 'The title cannot exceed 150 characters.'),

  category: postCategorySchema.default('Uncategorized'),

  headerImg: z.preprocess((value) => {
    if (typeof value !== 'string') {
      return value;
    }

    const trimmedValue = value.trim();

    return trimmedValue === '' ? undefined : trimmedValue;
  }, z.string().url('The header image must be a valid URL.').optional()),

  content: z
    .string()
    .trim()
    .min(1, 'Post content is required.')
    .max(100_000, 'Post content cannot exceed 100,000 characters.')
    .refine(
      (value) => {
        const textContent = value
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/gi, ' ')
          .trim();

        return textContent.length > 0;
      },
      {
        message: 'Post content cannot be empty.',
      }
    ),

  published: z.boolean().default(false),

  tags: z
    .array(postTagSchema)
    .max(10, 'You can add up to 10 tags.')
    .refine((tags) => new Set(tags).size === tags.length, {
      message: 'Duplicate tags are not allowed.',
    })
    .default([]),
});

export type CreatePostValues = z.infer<typeof createPostSchema>;
