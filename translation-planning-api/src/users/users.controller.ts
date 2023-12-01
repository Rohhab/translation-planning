import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  currentUser() {
    return 'You are the current user :)';
  }

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.usersService.signUp(body.name, body.email, body.password);
  }

  @Post('/signin')
  signIn() {
    return this.usersService.signIn();
  }
}
