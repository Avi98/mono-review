import {
  Controller,
  Get,
  Param,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from '../../session/session.gaurd';
import { UserService } from '../../user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(SessionGuard)
  @Get('me')
  async getMe(@Req() req) {
    const email = req.email;
    if (!email) throw new UnauthorizedException('User session not found');

    return await this.userService.getUserByEmail(email);
  }

  @UseGuards(SessionGuard)
  @Get('active-user/:userId')
  async getActiveUser(@Param('userId') userId: string) {
    return await this.userService.activateUser(userId);
  }

  @UseGuards(SessionGuard)
  @Get('in-active-user')
  getInActiveUser() {}
}
