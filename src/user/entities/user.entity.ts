import { AddressDto } from './../dto/address.dto';

import { Todo } from '../../todo/entities/todo.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Address } from './address.entity';

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

  @AutoMap()
  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column()
  @AutoMap()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @Column()
  role: string;

  @Column({ type: 'jsonb' })
  permissions: string[];

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
