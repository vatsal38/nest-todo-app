import { Todo } from './../todo/entities/todo.entity';
import { User } from './../user/entities/user.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DB_NAME'),
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        synchronize: configService.get<boolean>('DB_SYNC'),
        logging: configService.get<boolean>('DB_LOGGING'),
        migrations: ['./src/migration/*.ts'],
        entities: [User, Todo],
      }),
    }),
  ],
})
export class DatabaseModule {}
