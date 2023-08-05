import { Controller, Get, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../../session/session.gaurd';

@Controller('user')
export class UserController {
  constructor() {}

  @UseGuards(SessionGuard)
  @Get('/active-user')
  getActiveUser() {}

  @UseGuards(SessionGuard)
  @Get('/in-active-user')
  getInActiveUser() {}
}
