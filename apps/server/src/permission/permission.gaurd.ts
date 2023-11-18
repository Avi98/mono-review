import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from './permission.service';
import { PERMISSION_METADATA_KEY } from './permission.decorator';
import { PermissionType } from './permission.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.get<PermissionType>(
      PERMISSION_METADATA_KEY,
      context.getHandler(),
    );

    if (!requiredRoles) return false;

    const request = context.switchToHttp().getRequest();
    const userEmail = request.session.email;

    const user = await this.userService.getUserByEmail(userEmail);
    // const permission = await this.permissionService.getUserPermission(user.id);

    // console.log({ rootPemission: permission });
    console.log('============');
    return true;
  }
}
