import { Inject, Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PermissionRepository)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async setUserPermission() {
    return await this.permissionRepository.setUserPermission();
  }
  async allPermission() {
    return this.permissionRepository.allPermission();
  }
}
