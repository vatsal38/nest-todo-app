import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '../entities/permission.entity';

export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}
  async setUserPermission() {
    const getUserPermissionCode = this.permissionRepository.find({
      where: {
        name: In(['UserRead', 'UserWrite']),
      },
    });

    const permissionUser = (await getUserPermissionCode).map((s) => s.pId);
    return permissionUser;
  }

  async allPermission() {
    const getAllPermissionCode = this.permissionRepository.find();
    return (await getAllPermissionCode).map((s) => s.pId);
  }
}
