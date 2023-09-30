import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { User } from '../user/user.entity';
import { OrganizationUserService } from '../organization-user/organization-user.service';
import { OrganizationUser } from '../organization-user/organization-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, OrganizationUser])],
  providers: [OrganizationService, OrganizationUserService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
