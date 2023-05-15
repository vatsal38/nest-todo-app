/* eslint-disable prettier/prettier */
import { Todo } from './todo.entity';
import { Category } from '../../todo/entities/category.entity';
import { User } from '../../user/entities/user.entity';

describe('TodoEntity', () => {
  let todo: Todo;
  let category: Category;
  let user: User;

  beforeEach(() => {
    category = new Category('1', 'Category Title', 'Category Name', null);
    user = new User(
      '1',
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    );

    todo = new Todo(
      '1',
      'Todo Title',
      ['tag1', 'tag2'],
      category,
      '2023-05-11',
      false,
      user,
    );
  });

  it('should create a todo entity', () => {
    expect(todo).toBeInstanceOf(Todo);
    expect(todo.id).toEqual('1');
    expect(todo.title).toEqual('Todo Title');
    expect(todo.tags).toEqual(['tag1', 'tag2']);
    expect(todo.category).toBe(category);
    expect(todo.date).toEqual('2023-05-11');
    expect(todo.completed).toEqual(false);
    expect(todo.user).toBe(user);
  });
});
