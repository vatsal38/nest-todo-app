import { Category } from './../todo/entities/category.entity';
import { Todo } from '../todo/entities/todo.entity';
import { User } from '../user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { migration1681808966961 } from 'src/migration/1681808966961-migration';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'todo_db',
  username: 'postgres',
  password: 'Vatsal@0308',
  entities: [User, Todo, Category],
  migrations: [migration1681808966961],
  synchronize: false,
  logging: false,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

// './src/**/*.entity.{ts,js}'
