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
import { createAccountSchema } from '@/lib/schemas/userSchema';

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

const SignUpForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      callbackURL: '',
    },
  });

  const onSubmit = (data: z.infer<typeof createAccountSchema>) => {
    const { name, email, password } = data;

    startTransition(async () => {
      await authClient.signUp.email(
        {
          name,
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.add({
              type: 'success',
              title: 'Account created successfully',
              description: 'Please check your email to verify your account',
            });
            router.push('/');
            router.refresh();
          },
          onError: () => {
            toast.add({
              type: 'error',
              title: 'Failed to create account',
            });
          },
        }
      );
    });
  };

  const SignUpWithGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  const SignUpWithGithub = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    });
  };

  return (
    <Card className='mx-auto w-full max-w-lg'>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to get started.</CardDescription>
      </CardHeader>
      <form
        id='create-account-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CardContent>
          <FieldGroup>
            <FormFieldControl
              control={form.control}
              name='name'
              label='Full Name'
              type='text'
              placeholder='John Doe'
              required
            />
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
            <FormFieldControl
              control={form.control}
              name='confirmPassword'
              label='Confirm Password'
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
                <div className='flex items-center gap-4'>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => form.reset()}
                    disabled={isPending}
                  >
                    Reset
                  </Button>
                  <Button
                    type='submit'
                    form='create-account-form'
                    disabled={isPending}
                  >
                    {isPending ? <Spinner className='size-6' /> : 'Sign Up'}
                  </Button>
                </div>
                <p className='text-muted-foreground text-sm'>
                  Already have an account?{' '}
                  <Link
                    href='/sign-in'
                    className='hover:text-primary'
                  >
                    Sign In
                  </Link>
                </p>
              </div>
              <SeparatorWithText text='Or' />
              <div className='flex flex-col gap-4'>
                <Button
                  variant='outline'
                  onClick={SignUpWithGoogle}
                >
                  Sign in with Google <FcGoogle />
                </Button>
                <Button
                  variant='outline'
                  onClick={SignUpWithGithub}
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

export default SignUpForm;
