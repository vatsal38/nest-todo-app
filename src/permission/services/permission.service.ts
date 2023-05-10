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
    this.loggerService.log(`Set user to User Permission`);
    const getUserPermissionCode = this.permissionRepository.setUserPermission();
    const permissionUser = (await getUserPermissionCode).map((s) => s.pId);
    return permissionUser;
  }
  async allPermission(): Promise<string[]> {
    this.loggerService.log(`Set all permission`);
    return await this.permissionRepository.allPermission();
  }
}
