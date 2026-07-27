import { ReactNode } from 'react';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import GoBackButton from '@/components/GoBackButton';
import { auth } from '@/lib/auth';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) return redirect('/');

  return (
    <>
      <div className='absolute top-5 left-5'>
        <GoBackButton
          href='/'
          text='Go Back'
        />
      </div>
      <div className='mt-10 flex min-h-dvh w-full flex-col items-center justify-center'>
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
