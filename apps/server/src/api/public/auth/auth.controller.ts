import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
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
import { SessionWithRequestType } from '../../../session/interfaces';
import { InValidUserSession } from '../../../exceptions/errors';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() req: SessionWithRequestType,
    @Body() userInfo: LoginInfoDto,
  ) {
    const user = await this.userService.getUserByEmail(userInfo.email);

    //because localAuthGuard will handle the write and read
    req.session.email = userInfo.email;
    req.session.user_Id = user.id;

    const customResponse = {
      email: userInfo.email,
      message: 'login successful',
    };
    return customResponse;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(SessionGuard)
  @Get('/me')
  async me(@Req() req: SessionWithRequestType) {
    const userId = req.session?.user_Id;

    if (!userId)
      throw new InValidUserSession('User Session not found logout user');

    const userService = await this.userService.getUserById(userId);
    return userService;
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
