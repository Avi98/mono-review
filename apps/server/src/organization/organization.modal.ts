import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { OrganizationUser } from './organization-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationUser])],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
