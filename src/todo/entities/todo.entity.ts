import { Category } from './category.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  title: string;

  @Column('simple-array', { nullable: true })
  @AutoMap()
  tags: string[];

  @ManyToOne(() => Category, (category) => category.todos)
  @AutoMap()
  category: Category;

  @Column()
  @AutoMap()
  date: string;

  @Column()
  @AutoMap()
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  @AutoMap()
  user: User;
}
