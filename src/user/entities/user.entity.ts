import { AddressDto } from './../dto/address.dto';

import { Todo } from 'src/todo/entities/todo.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  address: AddressDto;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
