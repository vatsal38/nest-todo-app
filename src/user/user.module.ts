import { PermissionService } from './../permission/permission.service';
import { UserSeed } from './../user.seed';
import { PermissionRepository } from './../permission/permission.repository';
import { Permission } from './../permission/entities/permission.entity';
import { LoggerService } from './../logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UserController],
  providers: [
    UserService,
    LoggerService,
    PermissionRepository,
    UserRepository,
    UserSeed,
    PermissionService,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {
  constructor() {}
}
