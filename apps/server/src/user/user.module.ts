import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Organization } from '../organization/organization.entity';
import { OrganizationService } from '../organization/organization.service';
import { OrganizationUser } from '../organization/organization-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, OrganizationUser])],
  providers: [UserService, OrganizationService],
  exports: [UserService],
})
export class UserModule {}
