import { Constants } from './../../utils/constants';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request: any = ctx.getRequest<Request>();
    if (Constants.ROLES.ADMIN_ROLE === request.user.role) return true;
    return false;
  }
}
