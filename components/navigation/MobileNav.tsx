'use client';

import { useState } from 'react';

import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NAV_LINKS } from '@/constants';

import NavLink from './NavLink';
import SiteLogo from '../SiteLogo';

const MobileNav = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger>
        <Menu size={22} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <SiteLogo
              href='/'
              onClick={handleOpen}
            />
          </SheetTitle>
          <SheetDescription>
            A blog about all things tech an tech related.
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-4 px-4'>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.id}
              href={link.href}
              label={link.label}
              onClick={handleOpen}
              isMobile
            />
          ))}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
