import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entitiy';
import { Contract } from './entities/contract.entitiy';

@Injectable()
export class PlanningService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async create(id: number, title: string, pageCount: number) {
    const book = await this.bookRepository.create({ title, pageCount });
    this.bookRepository.save(book);
    return book;
  }

  async read() {}

  async update() {}

  async delete() {}
}
