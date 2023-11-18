import { SetMetadata } from '@nestjs/common';
import { PermissionType } from './permission.entity';

export const PERMISSION_METADATA_KEY = 'PERMISSION_METADATA_KEY';

export const RequiredPermission = (roles: PermissionType) =>
  SetMetadata(PERMISSION_METADATA_KEY, roles);
