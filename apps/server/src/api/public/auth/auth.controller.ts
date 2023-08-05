import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterUserDto } from '../../../user/user-info.dto';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../user/user.service';
import { LocalAuthGuard } from '../../../auth/local.strategy';
import { LoginInfoDto } from '../../../user/login-info.dto';
import { SessionGuard } from '../../../session/session.gaurd';
import { OrganizationService } from '../../../organization/organization.service';
import { UserStatusEnum } from '../../../utils/enums/UserStatusEnum';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private orgService: OrganizationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Body() userInfo: LoginInfoDto) {
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
    const source = this.userService.getUserSource();
    const organization = await this.orgService.createNewOrg({
      name: 'new organization',
    });
    // const org_user = await this.orgUserService.createUserOrg({
    //   name: 'new organization',
    //   invitationToken: '12121',
    //   organization,
    //   isAdmin: true,
    //   status: UserStatusEnum.ACTIVE,
    // });
    // const user = await this.userService.createNewUser({
    //   ...userInfo,
    //   orgUser: org_user,
    //   source,
    // });

    // return user;
  }
}
