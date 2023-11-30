import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlanningModule } from './planning/planning.module';

@Module({
  imports: [UsersModule, PlanningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
