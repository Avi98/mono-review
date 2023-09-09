import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../user/user.service';
import { OrganizationService } from '../../organization/organization.service';
import { User } from '../../user/user.entity';
import { Organization } from '../../organization/organization.entity';
import { Permission } from '../../permission/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from '../../permission/permission.service';
import { OrganizationController } from './organization.controller';

@Module({
  controllers: [UserController, OrganizationController],
  providers: [UserService, OrganizationService, PermissionService],
  imports: [TypeOrmModule.forFeature([User, Organization, Permission])],
})
export class PrivateApiModule {}
