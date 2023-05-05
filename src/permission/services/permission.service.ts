import { LoggerService } from '../../utils/logger/logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repository/permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
    private readonly loggerService: LoggerService,
  ) {}

  async setUserPermission() {
    this.loggerService.log(`Set user to User Permission`);
    const getUserPermissionCode = this.permissionRepository.setUserPermission();
    const permissionUser = (await getUserPermissionCode).map((s) => s.pId);
    return permissionUser;
  }
  async allPermission() {
    this.loggerService.log(`Set all permission`);
    return this.permissionRepository.allPermission();
  }
}
