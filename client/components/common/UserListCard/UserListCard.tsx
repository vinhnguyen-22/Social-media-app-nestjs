import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';
import UserAvatar from '../UserAvatar';

type UserListCardProps = {
  user: any;
};

const UserListCard: FC<UserListCardProps> = ({ user }) => {
  return (
    <div className='mb-3 w-full rounded-md p-4 shadow-sm'>
      <div className='flex'>
        <UserAvatar name={user.name} image={user.image} />

        <div className='flex w-full items-start justify-between'>
          <div className='flex flex-col'>
            <strong className='text-md ml-2 font-bold'>{user.name}</strong>
            <span className='ml-2 text-xs font-light'>@{user.username}</span>
          </div>

          <Link href='#'>
            <Button size={'sm'}>View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserListCard;
