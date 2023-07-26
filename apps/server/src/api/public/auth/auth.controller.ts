import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterUserDto } from '../../../user/user-info.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from 'src/auth/local.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    console.log({ req: req.session });
    req.session.email = req.email;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  async signup(@Body() userInfo: RegisterUserDto) {
    const source = this.userService.getUserSource();
    return await this.userService.createUser({ ...userInfo, source });
  }
}
