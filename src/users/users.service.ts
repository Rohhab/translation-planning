import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  signUp(): string {
    return "You're trying to sign up";
  }

  signIn(): string {
    return "You're trying to sign in";
  }
}
