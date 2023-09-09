import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionGuard } from '../../session/session.gaurd';
import { UserService } from '../../user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(SessionGuard)
  @Get('me')
  async getMe(@Req() req) {
    const email = req.session.email;
    if (!email) throw new UnauthorizedException('User session not found');

    return await this.userService.getUserByEmail(email);
  }

  //@todo this should be inside org.controller to get all active user
  // @UseGuards(SessionGuard)
  // @Get('active-user/:userId')
  // async getActiveUser(@Param('userId') userId: string) {
  //   return await this.userService.getAllActiveUser(userId);
  // }

  @UseGuards(SessionGuard)
  @Get('in-active-user')
  getInActiveUser() {}
}
