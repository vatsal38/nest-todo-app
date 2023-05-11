import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Todo } from './todo.entity';
import { AutoMap } from '@automapper/classes';

@Entity({
  schema: 'public',
  name: 'category',
})
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @Column()
  @AutoMap()
  categoryTitle: string;

  @Column()
  @AutoMap()
  categoryName: string;

  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];

  constructor(
    id: string,
    categoryTitle: string,
    categoryName: string,
    todos: Todo[],
  ) {
    super();
    this.id = id;
    this.categoryTitle = categoryTitle;
    this.categoryName = categoryName;
    this.todos = todos;
  }
}
