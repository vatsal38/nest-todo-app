import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Todo } from './todo.entity';

@Entity({
  schema: 'public',
  name: 'category',
})
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  categoryTitle: string;

  @Column()
  categoryName: string;

  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];
}
