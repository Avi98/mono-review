import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from '../../session/session.gaurd';
import { OrganizationInfoDto } from '../../organization/org-info.dto';
import { OrganizationService } from '../../organization/organization.service';
import { UserService } from '../../user/user.service';
import { UserSessionType } from '../../session/interfaces';
import { UserOrgRoleEnum } from '../../utils/enums/UserOrgRoleEnum';

@Controller('org')
export class OrganizationController {
  constructor(
    private orgService: OrganizationService,
    private userService: UserService,
  ) {}

  @UseGuards(SessionGuard)
  @Post('create')
  async createNewOrg(
    @Body() orgInfo: OrganizationInfoDto,
    @Session() session: UserSessionType,
  ) {
    try {
      const userEmail = session.email;
      const owner = await this.userService.getUserByEmail(userEmail);

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

  //@TODO create gaurd for roles with manger and admin can only add members
  @UseGuards(SessionGuard)
  @Post('add-member')
  async addUser(
    @Body() orgInfo: { userId: number; orgId: string; role?: UserOrgRoleEnum },
  ) {
    try {
      const member = await this.userService.getUserById(orgInfo.userId);
      return await this.orgService.addMemberToOrg(
        member,
        orgInfo.orgId,
        orgInfo.role,
      );
    } catch (error) {
      throw error;
    }
  }

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
    return await this.orgService.getUsersOrg(Number(userId));
  }

  //@TODO create gaurd for roles with manger and admin can only add members
  @UseGuards(SessionGuard)
  @Delete('delete-member/:memberId')
  async deleteMember(@Param('memberId') memberId: string) {
    await this.orgService.deleteMember(Number(memberId));
  }
}
