import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Todo } from './todo.entity';

@Entity({
  schema: 'public',
  name: 'category',
})
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany(() => Todo, (todo) => todo.category)
  id: Todo[];

  @Column()
  categoryTitle: string;

  @Column()
  categoryName: string;
}
