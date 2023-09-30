import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  providers: [UserService, PermissionService],
  exports: [UserService],
})
export class UserModule {}
