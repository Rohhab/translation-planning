import { User } from 'src/users/entities/user.entitiy';
import { Book } from './book.entitiy';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
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
  bookId: number;

  // @ManyToOne(() => User, (user) => user.contractId)
  // @Column()
  // user: User;

  // @OneToOne(() => Book)
  // @JoinColumn()
  // book: Book;
}
