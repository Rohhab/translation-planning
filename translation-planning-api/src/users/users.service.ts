import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  signUp(name: string, email: string, password: string): string {
    return `Your name is ${name},
    Provided email is ${email}`;
  }

  signIn(): string {
    return "You're trying to sign in";
  }
}
