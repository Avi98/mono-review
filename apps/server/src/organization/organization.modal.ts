import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Organization])],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
