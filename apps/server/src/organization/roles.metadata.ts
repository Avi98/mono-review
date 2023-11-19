import { SetMetadata } from '@nestjs/common';
import { UserOrgRoleEnum } from '../utils/enums/UserOrgRoleEnum';

export const ROLES = 'roles';
export const Roles = (roles: UserOrgRoleEnum[]) => SetMetadata(ROLES, roles);
