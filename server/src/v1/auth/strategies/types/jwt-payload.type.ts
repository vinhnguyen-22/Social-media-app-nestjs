import { Session } from 'src/v1/session/entities/session.entity';
import { User } from '../../../users/entities/user.entity';

export type JwtPayloadType = Pick<User, 'id'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
