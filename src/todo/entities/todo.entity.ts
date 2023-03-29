import { Category } from './category.entity';
import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @ManyToOne(() => Category, (category) => category.id, {
    persistence: true,
    eager: true,
  })
  @JoinColumn({ name: 'id' })
  category: Category;

  @Column()
  date: string;

  @Column()
  completed: boolean;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  user: User;
}
