import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findUser(...args: string[]) {
    if (args.length > 1) {
      const [name, email] = args;

      if (!name && !email) {
        throw new BadRequestException(
          'Provide either a username or an email to sign in',
        );
      } else {
        const [user] = await this.usersRepository.find({
          where: {
            name: name,
            email: email,
          },
        });
        return user;
      }
    } else {
      const [identifier] = args;
      const [user] = await this.usersRepository.find({
        where: [{ name: identifier }, { email: identifier }],
      });

      return user;
    }
  }
}
