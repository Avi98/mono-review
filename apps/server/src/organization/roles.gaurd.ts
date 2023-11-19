import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OrganizationService } from './organization.service';
import { UserOrgRoleEnum } from '../utils/enums/UserOrgRoleEnum';
import { ROLES } from './roles.metadata';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private orgService: OrganizationService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(ROLES, context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.session.user_Id;

    const userOrg = await this.orgService.getMemberRole(userId);
    return this.userHasRoles(roles, userOrg.at(0).role);
  }

  private userHasRoles(reqRoles: UserOrgRoleEnum[], role: UserOrgRoleEnum) {
    return reqRoles.includes(role);
  }
}
