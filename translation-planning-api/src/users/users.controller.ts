import { Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  currentUser() {
    return 'You are the current user :)';
  }

  @Post('/signup')
  signUp() {
    return this.usersService.signUp();
  }

  @Post('/signin')
  signIn() {
    return this.usersService.signIn();
  }
}
