import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../../session/session.gaurd';

/**
 * /create org
 * /invite user to org
 * /get org's all user
 *
 */
@Controller('user')
export class OrganizationController {
  constructor() {}

  @UseGuards(SessionGuard)
  @Post('create-organization')
  createOrg() {}

  @UseGuards(SessionGuard)
  @Post('invite-user')
  async inviteUser() {}

  @UseGuards(SessionGuard)
  @Get('get-orgs')
  async getOrgs() {}
}
