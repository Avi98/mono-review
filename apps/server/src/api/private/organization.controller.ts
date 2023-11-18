import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SessionGuard } from '../../session/session.gaurd';
import { OrganizationInfoDto } from '../../organization/org-info.dto';
import { OrganizationService } from '../../organization/organization.service';
import { UserService } from '../../user/user.service';

@Controller('org')
export class OrganizationController {
  constructor(
    private orgService: OrganizationService,
    private userService: UserService,
  ) {}

  @UseGuards(SessionGuard)
  @Post('create')
  async createNewOrg(@Body() orgInfo: OrganizationInfoDto) {
    try {
      const owner = await this.userService.getUserById(orgInfo.userId);
      await this.orgService.createNewOrg({
        owner,
        slug: orgInfo.orgSlug,
        name: orgInfo.orgName,
      });
      return `Successfully ${orgInfo.orgName} added`;
    } catch (error) {
      throw error;
    }
  }
  // @UseGuards(SessionGuard)
  // @Post('add-member')
  // async addUser(@Body() orgInfo: { userId: number; orgId: string }) {
  //   try {
  //     const member = await this.userService.getUserById(orgInfo.userId);
  //     return await this.orgService.addMemberToOrg(member, orgInfo.orgId);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  @UseGuards(SessionGuard)
  @Get('all-members/:orgId')
  async get(@Param('orgId') orgId: string) {
    try {
      return this.orgService.getAllMembers(orgId);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(SessionGuard)
  @Get('get-orgs/:userId')
  async getOrgs(@Param('userId') userId: string) {
    ({ userId });
  }
  @UseGuards(SessionGuard)
  @Get('get-users/:userId')
  async getOrgsUsers(@Param('userId') userId: string) {
    ({ userId });
  }

  @UseGuards(SessionGuard)
  @Post('add-member')
  async addUser(@Body() orgInfo: { userId: number; orgId: string }) {
    console.log('add-memeber');
  }

  @UseGuards(SessionGuard)
  @Post('delete-member')
  async deleteMember(@Body('memberId') memberId: string) {
    console.log({ deleteMembers: memberId });
  }
}
