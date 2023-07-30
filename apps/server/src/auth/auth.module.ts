import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService, LocalStrategy, UserService],
  imports: [UserModule, PassportModule],
})
export class AuthModule {}
