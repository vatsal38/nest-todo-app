import { LoggerService } from './../logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async setUserPermission() {
    this.loggerService.log(`Set user to User Permission`);
    return await this.permissionRepository.setUserPermission();
  }
  async allPermission() {
    this.loggerService.log(`Set all permission`);
    return this.permissionRepository.allPermission();
  }
}
