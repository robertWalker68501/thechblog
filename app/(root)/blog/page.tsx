import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

const BlogPage = () => {
  return (
    <div className='page-wrapper my-10'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Blog</h1>
        <Link
          href='/blog/create'
          className={buttonVariants({})}
        >
          Create Post
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;
