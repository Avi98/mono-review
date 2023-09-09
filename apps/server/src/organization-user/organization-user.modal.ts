import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationUser } from './organization-user.enitiy';
import { OrganizationUserService } from './organization-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationUser])],
  providers: [OrganizationUserService],
  exports: [OrganizationUserService],
})
export class UserModule {}
