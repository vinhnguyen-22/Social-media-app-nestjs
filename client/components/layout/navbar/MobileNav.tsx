import Logo from '@/components/common/Logo';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, User2 } from 'lucide-react';
import Link from 'next/link';
import SidebarItemLink from '../sidebar/SidebarItem/SidebarItemLink';

export default function MobileNav() {
  return (
    <nav className='flex items-center justify-between md:hidden'>
      <div className='flex items-center'>
        <Sheet>
          <SheetTrigger>
            <Menu height={30} width={30} className='font-bold' />
          </SheetTrigger>

          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle>
                <div className='flex items-center justify-start'>
                  <Logo title />
                </div>
              </SheetTitle>
              <SheetDescription>
                <SidebarItemLink />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <Logo />

      <Link href='/profile'>
        <User2 height={30} width={30} className='font-bold' />
      </Link>
    </nav>
  );
}
