import { User } from 'src/modules/v1/users/entities/user.entity';

export type LoginResponseType = Readonly<{
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;
