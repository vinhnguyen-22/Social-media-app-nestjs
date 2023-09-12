import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { Role } from 'src/modules/v1/roles/entities/role.entity';
import { lowerCaseTransformer } from 'src/modules/v1/utils/transformers/lower-case.transformer';
import { IsExist } from 'src/modules/v1/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/modules/v1/utils/validators/is-not-exists.validator';

export class CreateUserDto {
  @IsEmail()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'emailAlreadyExists',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  avatar?: string;

  @IsNumber()
  status?: number;

  gender?: boolean;

  refreshToken?: string;

  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;
}
