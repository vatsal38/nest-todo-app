import { LoggerService } from '../utils/logger/logger.service';
import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionRepository } from './repository/permission.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [PermissionService, PermissionRepository, LoggerService],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
