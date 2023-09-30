import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../../session/session.gaurd';
import { OrganizationInfoDto } from '../../organization/org-info.dto';
import { OrganizationService } from '../../organization/organization.service';

@Controller('org')
export class OrganizationController {
  constructor(private orgService: OrganizationService) {}

  @UseGuards(SessionGuard)
  @Post('add-organization')
  async addNewOrganization(@Body() orgInfo: OrganizationInfoDto) {
    try {
      await this.orgService.createNewOrg({
        name: orgInfo.orgName,
        userId: orgInfo.userId,
      });
      return `Successfully ${orgInfo.orgName} added`;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(SessionGuard)
  @Get('get-orgs/:userId')
  async getOrgs(@Param('userId') userId: string) {
    ({ userId });
  }
}
