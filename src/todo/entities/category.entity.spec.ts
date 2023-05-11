/* eslint-disable prettier/prettier */
import { Category } from './category.entity';
import { Todo } from '../../todo/entities/todo.entity';

describe('CategoryEntity', () => {
  let category: Category;
  let todo: Todo;

  beforeEach(() => {
    todo = new Todo(
      '1',
      'Todo Title',
      ['tag1', 'tag2'],
      null,
      '2023-05-11',
      false,
      null,
    );
    category = new Category('1', 'Category Title', 'Category Name', [todo]);
    todo.category = category;
  });

  it('should create a category entity', () => {
    expect(category).toBeInstanceOf(Category);
    expect(category.id).toEqual('1');
    expect(category.categoryTitle).toEqual('Category Title');
    expect(category.categoryName).toEqual('Category Name');
    expect(category.todos).toEqual([todo]);
  });

  it('should associate a category with todos', () => {
    expect(todo.category).toBe(category);
  });
});
