import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entitiy';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(name: string, email: string, password: string) {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });
    this.usersRepository.save(user);
    return user;
  }

  async signUp(name: string, email: string, password: string) {
    const user = await this.usersRepository.find({
      where: { email: email, name: name },
    });

    if (user.length) {
      throw new BadRequestException(
        'Email already registered, sign-in with your email or try to sign-up with another one',
      );
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const userEntity = await this.create(name, email, result);
    return userEntity;
  }

  async signIn(...args: string[]) {
    const providedPassword = args[2];

    if (args[0] !== '') {
      const [user] = await this.usersRepository.find({
        where: { name: args[0] },
      });

      if (!user) {
        throw new NotFoundException(
          'No user found with provided information, please sign-up first',
        );
      }

      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(providedPassword, salt, 32)) as Buffer;

      if (hash.toString('hex') !== storedHash) {
        throw new BadRequestException('Wrong password!');
      }

      return user;
    } else {
      const [user] = await this.usersRepository.find({
        where: { email: args[1] },
      });

      if (!user) {
        throw new NotFoundException(
          'No user found with provided information, please sign-up first',
        );
      }

      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(providedPassword, salt, 32)) as Buffer;

      if (hash.toString('hex') !== storedHash) {
        throw new BadRequestException('Wrong password!');
      }

      return user;
    }
  }
}
