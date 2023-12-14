import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { SessionGuard } from '../../session/session.gaurd';
import { UserOrgRoleEnum } from '../../utils/enums/UserOrgRoleEnum';
import { Roles } from '../../organization/roles.metadata';
import { AddMemberDto } from '../../organization/add-member.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Add user to org
   * status is inActive
   * return User @User
   * @param userInfo
   * @param session
   */
  @UseGuards(SessionGuard)
  @Roles([UserOrgRoleEnum.ADMIN, UserOrgRoleEnum.MANAGER])
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('add-new-member')
  async addNewMember(@Body() userInfo: AddMemberDto) {
    return await this.userService.createNewMemberAddToOrg(userInfo);
  }
}
