import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { localAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login/google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @Post('/login/signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(
      body.username,
      body.email,
      body.password,
    );
    return user;
  }

  @UseGuards(localAuthGuard)
  @Post('/login/signin')
  async login(@Request() req) {
    return req.user;
  }
  // async signIn(@Body() body: Partial<CreateUserDto>) {
  //   const user = await this.authService.signIn(
  //     body.username,
  //     body.email,
  //     body.password,
  //   );
  //   return user;
  // }
}
