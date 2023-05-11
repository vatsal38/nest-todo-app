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
  @AutoMap()
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

  @OneToOne(() => Address, (address) => address.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  @AutoMap()
  address: Address;

  @Column()
  @AutoMap()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @Column()
  @AutoMap()
  role: string;

  @Column({ type: 'jsonb' })
  @AutoMap()
  permissions: string[];

  @OneToMany(() => Todo, (todo) => todo.user)
  @AutoMap()
  todos: Todo[];

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    address: Address,
    role: string,
    permissions: string[],
  ) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.address = address;
    this.role = role;
    this.permissions = permissions;
  }
}
