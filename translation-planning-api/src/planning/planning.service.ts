import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(title: string, pageCount: number) {
    const book = await this.bookRepository.create({ title, pageCount });
    this.bookRepository.save(book);
    return book;
  }

  async read() {}

  async update() {}

  async delete() {}
}
