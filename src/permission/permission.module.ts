import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [PermissionService, PermissionRepository],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
