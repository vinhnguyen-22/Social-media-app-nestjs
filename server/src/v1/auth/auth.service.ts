import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return {
      message: 'Register an user',
    };
  }

  login() {
    return {
      message: 'Login an user',
    };
  }
}
