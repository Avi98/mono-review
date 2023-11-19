import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Organization } from '../organization/organization.entity';
import { OrganizationService } from '../organization/organization.service';
import { OrganizationUser } from '../organization/organization-user.entity';

@Module({
  providers: [AuthService, LocalStrategy, UserService, OrganizationService],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, Organization, OrganizationUser]),
  ],
})
export class AuthModule {}
