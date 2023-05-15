/* eslint-disable prettier/prettier */
import { PermissionsGuard } from './../auth/guard/permission.guard';
import { UserModule } from './../user/user.module';
import { AuditTrail } from './../audit-trail/entities/audit-trail.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditController } from './audit-list.controller';
import { AuditService } from './audit-list.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuditTrail]), UserModule],
  controllers: [AuditController],
  providers: [AuditService, PermissionsGuard],
  exports: [],
})
export class AuditModule {}
