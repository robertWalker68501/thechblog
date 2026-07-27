import type { Metadata } from 'next';
import { Roboto, DM_Sans } from 'next/font/google';

import './globals.css';
import { Toaster } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import Providers from '@/providers/Providers';

const dmSansHeading = DM_Sans({subsets:['latin'],variable:'--font-heading'});

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'TechBlog',
  description: 'A blog about all things tech an tech related.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
              'h-full',
              'antialiased',
              'font-sans'
            , "font-sans", roboto.variable, dmSansHeading.variable)}
      suppressHydrationWarning
    >
      <body
        className='flex min-h-full flex-col'
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
