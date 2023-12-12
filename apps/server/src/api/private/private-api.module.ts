import { Module } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { OrganizationService } from '../../organization/organization.service';
import { User } from '../../user/user.entity';
import { Organization } from '../../organization/organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationController } from './organization.controller';
import { OrganizationUser } from '../../organization/organization-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization, OrganizationUser])],
  controllers: [OrganizationController],
  providers: [UserService, OrganizationService],
})
export class PrivateApiModule {}
