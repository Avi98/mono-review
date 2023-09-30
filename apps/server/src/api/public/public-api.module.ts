import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';
import { PermissionService } from '../../permission/permission.service';
import { Permission } from '../../permission/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  providers: [AuthService, UserService, PermissionService],
  controllers: [AuthController],
})
export class PublicApiModule {}
