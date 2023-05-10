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
    /*eslint-disable */
    entities: [__dirname + './../../**/entities/*.entity.{ts,js}'],
    migrations: [__dirname + './../../database/migration/*.{ts,js}'],
    synchronize: false,
    dropSchema: false,
  }),
});
