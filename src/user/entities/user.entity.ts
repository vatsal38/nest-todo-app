import { AddressDto } from './../dto/address.dto';

import { Todo } from '../../todo/entities/todo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
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

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @Column()
  role: string;

  @Column({ type: 'jsonb', nullable: true })
  permissions: string[];

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
