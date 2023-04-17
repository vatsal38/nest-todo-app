import { LoggerService } from './../logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import seedUsers from '../user.seed';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, LoggerService],
  exports: [UserService],
})
export class UserModule {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    await this.connection.runMigrations();
    await seedUsers(this.connection);
  }
}
