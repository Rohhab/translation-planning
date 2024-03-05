import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  async signUp(...args: string[]) {
    const [name, email, password] = args;
    const user = await this.usersService.findUser(name, email);

    if (user) {
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
    const [name, email, providedPassword] = args;

    const user = await this.usersService.findUser(name, email);
    if (!user) {
      throw new NotFoundException(
        'No user found in the first if with provided information, please sign-up first',
      );
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(providedPassword, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Wrong password!');
    }

    return user;
  }

  async validateUser(...args: string[]): Promise<any> {
    const [identifier, providedPassword] = args;

    const user = await this.usersService.findUser(identifier);

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(providedPassword, salt, 32)) as Buffer;

    if (user && hash.toString('hex') === storedHash) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
