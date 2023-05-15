import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  BaseEntity,
} from 'typeorm';
import { User } from './user.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  street: string;

  @Column()
  @AutoMap()
  city: string;

  @Column()
  @AutoMap()
  state: string;

  @Column()
  @AutoMap()
  zipcode: number;

  @OneToOne(() => User, (user) => user.address)
  user: User;

  constructor(
    id: string,
    street: string,
    city: string,
    state: string,
    zipcode: number,
    user: User,
  ) {
    super();
    this.id = id;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipcode = zipcode;
    this.user = user;
  }
}
