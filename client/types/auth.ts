import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface IInputs {
  email: string;
  password: string;
}

export interface IAuthPageInput {
  register: UseFormRegister<IInputs>;
  errors: FieldErrors<IInputs>;
}

export interface ISignUp {
  url: string;
  username: string;
  password: string;
  email: string;
}

export interface ISignIn {
  url: string;
  username: string;
  password: string;
}

export interface IUser {
  username?: string;
  name: string | null;
  email?: string;
  photo: string | null;
}
