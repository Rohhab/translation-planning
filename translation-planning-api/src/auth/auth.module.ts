import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { currentUserMiddleware } from 'src/middlewares/current-user.middleware';

@Module({
  imports: [UsersModule, ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(currentUserMiddleware).forRoutes('*');
  }
}
