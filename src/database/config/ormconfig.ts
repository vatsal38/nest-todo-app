import { migration1681808966961 } from 'src/migration/1681808966961-migration';
import { User } from './../../user/entities/user.entity';
import { Todo } from './../../todo/entities/todo.entity';
import { Category } from './../../todo/entities/category.entity';
import { DataSource } from 'typeorm';
import { env } from '../../env';

export default new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  entities: [User, Todo, Category],
  migrations: [migration1681808966961],
  synchronize: false,
  dropSchema: false,
});