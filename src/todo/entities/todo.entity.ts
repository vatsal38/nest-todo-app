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
  id: string;

  @Column()
  @AutoMap()
  title: string;

  @Column('simple-array', { nullable: true })
  @AutoMap()
  tags: string[];

  @ManyToOne(() => Category, (category) => category.todos)
  category: Category;

  @Column()
  date: string;

  @Column()
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  user: User;
}
