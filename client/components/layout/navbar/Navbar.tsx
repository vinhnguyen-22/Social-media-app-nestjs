import Logo from '@/components/common/Logo';
import { buttonVariants } from '@/components/ui/button';
import { IUser } from '@/types/auth';
import Link from 'next/link';
import { FC } from 'react';
import UserAccountNav from './UserAccountNav';

interface NavbarProps {
  user?: Pick<IUser, 'name' | 'photo' | 'email'>;
}
const Navbar: FC<NavbarProps> = ({ user }) => {
  return (
    <div className='fixed inset-x-0 top-0 z-[10] hidden h-fit border-b border-background bg-background py-2 md:block'>
      <div className='container mx-auto flex w-full max-w-7xl items-center justify-between gap-2'>
        <Logo title />

        {/* actions */}
        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Link href='/login' className={buttonVariants()}>
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
