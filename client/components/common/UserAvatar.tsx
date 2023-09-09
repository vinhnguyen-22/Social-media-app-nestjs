import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type UserAvatarProps = {
  name: string;
  image?: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ name, image }) => {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
