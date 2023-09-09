import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterUserDto } from '../../../user/user-info.dto';
import { UserService } from '../../../user/user.service';
import { LocalAuthGuard } from '../../../auth/local.strategy';
import { LoginInfoDto } from '../../../user/login-info.dto';
import { SessionGuard } from '../../../session/session.gaurd';
import { OrganizationService } from '../../../organization/organization.service';
import { OrganizationUserService } from '../../../organization-user/organization-user.service';
import { UserStatusEnum } from '../../../utils/enums/UserStatusEnum';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Body() userInfo: LoginInfoDto) {
    //because localAuthGuard will handle the write and read
    req.session.email = userInfo.email;
  }

  @UseGuards(SessionGuard)
  @Delete('/logout')
  logout(@Req() req) {
    return new Promise((res, rej) => {
      req.session.destroy((err) => {
        if (err) {
          rej(new BadRequestException('unable to logout'));
        }
        res('');
      });
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async signup(@Body() userInfo: RegisterUserDto) {
    const user = await this.userService.createNewUser(userInfo);

    return user;

  }
}
