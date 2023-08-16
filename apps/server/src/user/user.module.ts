import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { OrganizationService } from '../organization/organization.service';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/permission.entity';
import { Organization } from '../organization/organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission, Organization])],
  providers: [UserService, PermissionService, OrganizationService],
  exports: [UserService],
})
export class UserModule {}
