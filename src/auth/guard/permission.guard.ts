import { UserService } from '../../user/services/user.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }

    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest<Request>();

    const user = await this.userService.findUserById(request.user.id);
    const userPermissions = user.permissions;

    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
