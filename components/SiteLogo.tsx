import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface SiteLogoProps {
  href: string;
  classNames?: string;
  onClick?: () => void;
  imgSrc?: string;
  imgAlt?: string;
  imgHeight?: number;
  imgWidth?: number;
  text?: string;
}

const SiteLogo = ({
  href,
  classNames,
  onClick,
  imgSrc = '/assets/images/logo.png',
  imgAlt = 'TechBlog Logo',
  imgHeight = 25,
  imgWidth = 25,
  text = 'TechBlog',
}: SiteLogoProps) => {
  return (
    <Link
      href={href}
      className={cn('flex items-center gap-2 text-2xl font-bold', classNames)}
      onClick={onClick}
    >
      <Image
        src={imgSrc}
        alt={imgAlt}
        height={imgHeight}
        width={imgWidth}
      />
      {text}
    </Link>
  );
};

export default SiteLogo;
