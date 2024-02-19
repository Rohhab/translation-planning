import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string, password: string) {
    const user = this.usersRepository.create({
      name,
      email,
      password,
    });
    await this.usersRepository.save(user);
    return user;
  }

  async findUser(name: string, email: string) {
    const user = await this.usersRepository.find({
      where: {
        email: email,
        name: name,
      },
    });
    return user;
  }

  async findUserTest(...args: string[]) {
    if (args[0]) {
      const [user] = await this.usersRepository.find({
        where: { name: args[0] },
      });
      if (!user) {
        throw new NotFoundException(
          'No user found with provided information, please sign-up first',
        );
      }
      return user;
    } else if (args[1]) {
      const [user] = await this.usersRepository.find({
        where: { email: args[1] },
      });
      if (!user) {
        throw new NotFoundException(
          'No user found with provided information, please sign-up first',
        );
      }
      return user;
    } else {
      throw new BadRequestException(
        'Provide either a username or an email to sign in',
      );
    }
  }
}
