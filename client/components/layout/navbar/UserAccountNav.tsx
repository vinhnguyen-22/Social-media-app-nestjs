'use client';
import { IUser } from '@/types/auth';
import { AvatarProps } from '@radix-ui/react-avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { UserAvatar } from './UserAvatar';

interface UserAccountNavProps extends AvatarProps {
  user: Pick<IUser, 'name' | 'photo' | 'email'>;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user, ...props }) => {
  const router = useRouter();
  const logOut = async () => {
    router.push('/login');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className='h-8 w-8'
          user={{
            name: user.name || null,
            photo: user.photo || null,
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}

            {user.email && (
              <p className='w-[200px] truncate text-sm '>{user.email}</p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/feed'> Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/r/create'}>Create Community</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/settings'}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            logOut();
          }}
          className='cursor-pointer'
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
