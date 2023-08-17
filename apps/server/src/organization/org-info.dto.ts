import { IsString } from 'class-validator';
import { PermissionType } from '../permission/permission.entity';

export class OrganizationInfoDto {
  @IsString()
  orgName: string;

  @IsString()
  userId: string;

  @IsString()
  roleType: PermissionType;
}
