import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../../session/session.gaurd';
import { OrganizationInfoDto } from '../../organization/org-info.dto';
import { UserService } from '../../user/user.service';

@Controller('org')
export class OrganizationController {
  constructor(private userService: UserService) {}

  @UseGuards(SessionGuard)
  @Post('add-organization')
  async addNewOrganization(@Body() orgInfo: OrganizationInfoDto) {
    await this.userService.createNewOrg({
      orgName: orgInfo.orgName,
      userId: orgInfo.userId,
      role: orgInfo.roleType,
    });
    return `Successfully ${orgInfo.orgName} added`;
  }

  @UseGuards(SessionGuard)
  @Post('invite-user')
  async inviteUser() {}

  @UseGuards(SessionGuard)
  @Get('get-orgs/:userId')
  async getOrgs(@Param('userId') userId: string) {
    ({ userId });
  }
}
