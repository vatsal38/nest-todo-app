import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';

export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async setUserPermission(): Promise<Permission[]> {
    return await this.permissionRepository.find({
      where: {
        name: In(['UserRead', 'UserWrite']),
      },
    });
  }

  async allPermission(): Promise<string[]> {
    const getAllPermissionCode = this.permissionRepository.find();
    return (await getAllPermissionCode).map((s) => s.pId);
  }
}
