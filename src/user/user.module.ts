import { PermissionRepository } from './../permission/permission.repository';
import { Permission } from './../permission/entities/permission.entity';
import { LoggerService } from './../logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import seedUsers from '../user.seed';
import { Connection } from 'typeorm';
import { UserRepository } from './user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UserController],
  providers: [UserService, LoggerService, PermissionRepository, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {
  constructor(private readonly connection: Connection) {}

  async onModuleInit() {
    await this.connection.runMigrations();
    await seedUsers(this.connection);
  }
}
