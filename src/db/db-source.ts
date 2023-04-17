import { migration1680095629089 } from './../migration/1680095629089-migration';
import { migration1680086287180 } from './../migration/1680086287180-migration';
import { Category } from './../todo/entities/category.entity';
import { Todo } from '../todo/entities/todo.entity';
import { User } from '../user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'todo_db',
  username: 'postgres',
  password: 'Vatsal@0308',
  entities: [User, Todo, Category],
  migrations: [migration1680086287180, migration1680095629089],
  synchronize: false,
  logging: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

// './src/**/*.entity.{ts,js}'
