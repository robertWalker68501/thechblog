import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import HeroImg from '@/public/assets/images/header-image.png';

export default function Home() {
  return (
    <div className='page-wrapper my-10'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div>
          <h1 className='text-4xl md:text-5xl lg:text-6xl'>
            <span className='text-primary font-bold'>TechBlog</span> the home
            for developers
          </h1>
          <p className='text-muted-foreground mb-3'>
            TechBlog is a modern destination for developers, engineers, and
            technology enthusiasts who want to stay current with the
            ever-changing world of software development. From practical
            tutorials and in-depth guides to industry insights and real-world
            projects, every article is written to help you build better
            applications, sharpen your skills, and explore the technologies
            shaping the future of the web.
          </p>
          <p className='text-muted-foreground mb-3'>
            Whether you&apos;re learning React, mastering Next.js, exploring
            TypeScript, working with databases, or diving into artificial
            intelligence, TechBlog provides clear, actionable content for
            developers of all experience levels. Our goal is to make complex
            topics approachable through hands-on examples, best practices, and
            production-ready techniques that you can apply to your own projects
            with confidence.
          </p>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className={buttonVariants({ variant: 'outline' })}
            >
              Lear more
            </Link>
            <Link
              href='/'
              className={buttonVariants({})}
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className='relative h-120 w-auto'>
          <Image
            src={HeroImg}
            alt='Hero Image'
            fill
          />
        </div>
      </div>
    </div>
  );
}
