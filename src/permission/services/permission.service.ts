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

  async setUserPermission(): Promise<string[]> {
    const getUserPermissionCode = this.permissionRepository.setUserPermission();
    const permissionUser = (await getUserPermissionCode).map((s) => s.pId);
    this.loggerService.log(`Set user to User Permission`);
    return permissionUser;
  }
  async allPermission(): Promise<string[]> {
    this.loggerService.log(`Set all permission`);
    return await this.permissionRepository.allPermission();
  }
}
