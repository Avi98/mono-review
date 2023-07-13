import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from '../../../user/user-info.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() userInfo: RegisterUserDto) {
    await this.authService.registerUser(userInfo);
    return 'created user';
  }
}
