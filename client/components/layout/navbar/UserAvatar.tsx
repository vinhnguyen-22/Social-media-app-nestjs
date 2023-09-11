import { AvatarProps } from '@radix-ui/react-avatar';

import { Icons } from '@/components/Icons';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { IUser } from '@/types/auth';
import Image from 'next/image';

interface UserAvatarProps extends AvatarProps {
  user: Pick<IUser, 'name' | 'photo'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.photo ? (
        <div className='relative aspect-square h-full w-full'>
          <Image
            fill
            src={user.photo}
            alt='profile picture'
            referrerPolicy='no-referrer'
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user?.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
