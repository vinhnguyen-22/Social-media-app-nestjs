export class CreateUserDto {
  email: string;
  hashedPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
}

export class UserResponseDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
