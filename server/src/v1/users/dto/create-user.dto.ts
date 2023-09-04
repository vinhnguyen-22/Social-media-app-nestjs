import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { lowerCaseTransformer } from 'src/v1/utils/transformers/lower-case.transformer';
import { IsNotExist } from 'src/v1/utils/validators/is-not-exists.validator';

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
}
