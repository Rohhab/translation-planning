import { Book } from 'src/planning/entities/book.entitiy';
import { Contract } from 'src/planning/entities/contract.entitiy';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];

  @OneToMany(() => Contract, (contract) => contract.book)
  contracts: Contract[];
}
