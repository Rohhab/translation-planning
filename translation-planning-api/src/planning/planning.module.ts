import { Module } from '@nestjs/common';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { Contract } from './entities/contract.entitiy';
import { Book } from './entities/book.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Book])],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule {}
