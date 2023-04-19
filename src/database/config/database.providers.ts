import { migration1681808966961 } from 'src/migration/1681808966961-migration';
import { Category } from './../../todo/entities/category.entity';
import { Todo } from './../../todo/entities/todo.entity';
import { User } from './../../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from '../../env';

/**
 * Database provider
 *
 * contains database factory provider
 * we use TypeOrmModule here and add connection
 */
export const DatabaseProvider = TypeOrmModule.forRootAsync({
  useFactory: () => ({
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
  }),
});
