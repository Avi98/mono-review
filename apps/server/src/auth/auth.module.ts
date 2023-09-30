import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Permission } from '../permission/permission.entity';
import { Organization } from '../organization/organization.entity';
import { PermissionService } from '../permission/permission.service';
import { OrganizationService } from '../organization/organization.service';
import { OrganizationUserService } from '../organization-user/organization-user.service';
import { OrganizationModule } from '../organization/organization.modal';
import { OrganizationUser } from '../organization-user/organization-user.entity';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    PermissionService,
    OrganizationService,
    OrganizationUserService,
  ],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([
      User,
      Permission,
      Organization,
      OrganizationUser,
    ]),
  ],
})
export class AuthModule {}
