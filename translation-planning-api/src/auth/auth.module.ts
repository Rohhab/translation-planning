import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { requestShaperMiddleware } from 'src/middlewares/request-shaper.middleware';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, LocalStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requestShaperMiddleware).forRoutes('/auth/login/signin');
  }
}
