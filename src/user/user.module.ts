import { PermissionService } from '../permission/services/permission.service';
import { UserSeed } from './seed-data/user.seed';
import { PermissionRepository } from '../permission/repository/permission.repository';
import { Permission } from './../permission/entities/permission.entity';
import { LoggerService } from '../utils/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './mapper/user-mapper';
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
    UserMapper,
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
