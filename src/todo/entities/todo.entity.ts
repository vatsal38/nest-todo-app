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

  constructor(
    id: string,
    title: string,
    tags: string[],
    category: Category,
    date: string,
    completed: boolean,
    user: User,
  ) {
    super();
    this.id = id;
    this.title = title;
    this.tags = tags;
    this.category = category;
    this.date = date;
    this.completed = completed;
    this.user = user;
  }
}
