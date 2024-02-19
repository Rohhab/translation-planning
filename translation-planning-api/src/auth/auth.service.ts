import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from 'src/users/users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async googleLogin(req) {
    if (!req.user) {
      return 'Google account is not verified';
    }
    return {
      email: req.user.email,
      name: req.user.firstName,
    };
  }

  async signUp(name: string, email: string, password: string) {
    const user = await this.usersService.findUser(name, email);

    if (user.length) {
      throw new BadRequestException(
        'Email already registered, sign-in with your email or try to sign-up with another one',
      );
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const userEntity = await this.usersService.createUser(name, email, result);
    return userEntity;
  }

  async signIn(...args: string[]) {
    const providedPassword = args[2];

    const user = await this.usersService.findUserTest(...args);

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(providedPassword, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Wrong password!');
    }

    return user;
  }
}
