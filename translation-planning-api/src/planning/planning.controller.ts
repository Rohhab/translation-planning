import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { CreateBookDto } from './dtos/create-book.dto';

@Controller('planning')
export class PlanningController {
  constructor(private planningService: PlanningService) {}

  @Post('new-book')
  addBook(@Param('id') id: string, @Body() createBookDto: CreateBookDto) {
    return this.planningService.create(
      parseInt(id),
      createBookDto.title,
      createBookDto.pageCount,
    );
  }

  @Get()
  fetchAll() {
    console.log('All books');
  }
}
