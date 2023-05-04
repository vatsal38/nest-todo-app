import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';
import { Constants } from '../../utils/constants';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PermissionService } from '../../permission/services/permission.service';
@Injectable()
export class UserSeed implements OnModuleInit {
  constructor(
    private readonly connection: Connection,
    private permissionService: PermissionService,
  ) {}

  async onModuleInit() {
    const allPermissions = await this.permissionService.allPermission();

    const users = [
      {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: 'admin',
        address: null,
        role: Constants.ROLES.ADMIN_ROLE,
        permissions: allPermissions,
      },
      {
        firstName: 'seed',
        lastName: 'seed',
        email: 'seed@seed.com',
        password: 'seed',
        address: null,
        role: Constants.ROLES.ADMIN_ROLE,
        permissions: allPermissions,
      },
    ];
    const existingEmails = await this.connection.getRepository(User).find({
      select: ['email'],
    });
    const uniqueUsers = users.filter((user) => {
      return !existingEmails.some((emailObj) => emailObj.email === user.email);
    });
    await this.connection.getRepository(User).save(uniqueUsers);
  }
}
