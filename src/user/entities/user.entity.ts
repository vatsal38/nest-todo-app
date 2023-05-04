import { AddressDto } from './../dto/address.dto';

import { Todo } from '../../todo/entities/todo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @AutoMap()
  firstName: string;

  @Column()
  @AutoMap()
  lastName: string;

  @Column()
  @AutoMap()
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  @AutoMap()
  address: AddressDto;

  @Column()
  @AutoMap()
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
