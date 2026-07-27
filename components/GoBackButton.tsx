import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from './ui/button';

interface GoBackButtonProps {
  href: string;
  text: string;
}

const GoBackButton = ({ href, text }: GoBackButtonProps) => {
  return (
    <Link
      href={href}
      className={`${buttonVariants({ variant: 'outline' })} flex items-center gap-2`}
    >
      <ArrowLeft size={16} />
      {text}
    </Link>
  );
};

export default GoBackButton;
