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
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from 'src/auth/local.strategy';
import { SessionGuard } from 'src/session/session.gaurd';
import { LoginInfoDto } from 'src/user/login-info.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
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
    return await this.userService.createUser({ ...userInfo, source });
  }
}
