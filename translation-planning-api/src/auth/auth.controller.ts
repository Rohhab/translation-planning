import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login/signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(
      body.name,
      body.email,
      body.password,
    );
    return user;
  }

  @Post('/login/signin')
  async signIn(@Body() body: Partial<CreateUserDto>) {
    const user = await this.authService.signIn(
      body.name,
      body.email,
      body.password,
    );
    return user;
  }
}
