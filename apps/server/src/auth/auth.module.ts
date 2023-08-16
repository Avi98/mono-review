import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Permission } from '../permission/permission.entity';
import { Organization } from '../organization/organization.entity';
import { PermissionService } from '../permission/permission.service';
import { OrganizationService } from '../organization/organization.service';

@Module({
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    PermissionService,
    OrganizationService,
  ],
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([User, Permission, Organization]),
  ],
})
export class AuthModule {}
