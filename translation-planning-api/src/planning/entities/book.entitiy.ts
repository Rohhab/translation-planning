import { User } from 'src/users/entities/user.entitiy';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Contract } from './contract.entitiy';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  pageCount: number;

  @ManyToMany(() => User)
  translators: User[];

  @OneToMany(() => Contract, (contract) => contract.book)
  contracts: Contract[];
}
