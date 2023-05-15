/* eslint-disable prettier/prettier */
import { User } from './user.entity';
import { Address } from './address.entity';
import { Todo } from '../../todo/entities/todo.entity';
import { Category } from '../../todo/entities/category.entity';

describe('UserEntity', () => {
  let user: User;
  let address: Address;
  let todo: Todo;
  let category: Category;

  beforeEach(() => {
    address = new Address(
      'addressId',
      '123 Street',
      'City',
      'State',
      12345,
      null,
    );
    user = new User(
      '1',
      'vatsal',
      'mavani',
      'vatsal@gmail.com',
      address,
      'vatsal',
      null,
      null,
      'user',
      ['read', 'write'],
      null,
    );
    address.user = user;

    category = new Category('1', 'Category Title', 'Category Name', null);

    todo = new Todo(
      '1',
      'Todo Title',
      ['tag1', 'tag2'],
      category,
      '2023-05-11',
      false,
      user,
    );
    user.todos = [todo];
    todo.user = user;
  });

  it('should create a user entity', () => {
    expect(user).toBeInstanceOf(User);
    expect(user.id).toEqual('1');
    expect(user.firstName).toEqual('vatsal');
    expect(user.lastName).toEqual('mavani');
    expect(user.email).toEqual('vatsal@gmail.com');
    expect(user.password).toEqual('vatsal');
    expect(user.role).toEqual('user');
    expect(user.permissions).toEqual(['read', 'write']);
    expect(user.address).toBeInstanceOf(Address);
    expect(user.address.id).toEqual('addressId');
    expect(user.address.street).toEqual('123 Street');
    expect(user.address.city).toEqual('City');
    expect(user.address.state).toEqual('State');
    expect(user.address.zipcode).toEqual(12345);
    expect(user.todos).toEqual([todo]);
  });

  it('should associate a user with an address', () => {
    expect(user.address.user).toBe(user);
  });

  it('should associate a user with todos', () => {
    expect(todo.user).toBe(user);
  });
});
