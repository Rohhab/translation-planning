import { Book } from './book.entitiy';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contractor: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  pagesTranslated: number;

  @ManyToOne(() => Book, (book) => book.contracts)
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
