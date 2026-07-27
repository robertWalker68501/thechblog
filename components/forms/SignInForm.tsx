'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { LuGithub } from 'react-icons/lu';
import * as z from 'zod';

import { authClient } from '@/lib/auth-client';
import { signInUserSchema } from '@/lib/schemas/userSchema';

import { FormFieldControl } from '../form-fields/FormFieldControl';
import SeparatorWithText from '../SeparatorWithText';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Field, FieldGroup } from '../ui/field';
import { Spinner } from '../ui/spinner';
import { toast } from '../ui/toast';

const SignInForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signInUserSchema>>({
    resolver: zodResolver(signInUserSchema),
    defaultValues: {
      email: '',
      password: '',
      callbackURL: '',
    },
  });

  const onSubmit = (data: z.infer<typeof signInUserSchema>) => {
    const { email, password } = data;

    startTransition(async () => {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.add({
              type: 'success',
              title: 'Signed in successfully',
            });
            router.push('/');
            router.refresh();
          },
          onError: () => {
            toast.add({
              type: 'error',
              title: 'Failed to sign in',
            });
          },
        }
      );
    });
  };

  const SignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  const SignInWithGithub = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    });
  };

  return (
    <Card className='mx-auto w-full max-w-lg'>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to start posting.</CardDescription>
      </CardHeader>
      <form
        id='sign-in-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CardContent>
          <FieldGroup>
            <FormFieldControl
              control={form.control}
              name='email'
              label='Email'
              type='email'
              placeholder='john.doe@example.com'
              required
            />
            <FormFieldControl
              control={form.control}
              name='password'
              label='Password'
              type='password'
              placeholder='********'
              required
            />
          </FieldGroup>
        </CardContent>
        <CardFooter className='mt-6'>
          <Field orientation='horizontal'>
            <div className='flex w-full flex-col gap-3'>
              <div className='flex w-full items-center justify-between'>
                <div className='flex items-center'>
                  <Button
                    type='submit'
                    form='sign-in-form'
                    disabled={isPending}
                  >
                    {isPending ? <Spinner className='size-6' /> : 'Sign In'}
                  </Button>
                </div>
                <p className='text-muted-foreground text-sm'>
                  Don&apos;t have an account?{' '}
                  <Link
                    href='/sign-up'
                    className='hover:text-primary'
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <SeparatorWithText text='Or' />
              <div className='flex flex-col gap-4'>
                <Button
                  variant='outline'
                  onClick={SignInWithGoogle}
                >
                  Sign in with Google <FcGoogle />
                </Button>
                <Button
                  variant='outline'
                  onClick={SignInWithGithub}
                >
                  Sign in with GitHub <LuGithub />
                </Button>
              </div>
            </div>
          </Field>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignInForm;
