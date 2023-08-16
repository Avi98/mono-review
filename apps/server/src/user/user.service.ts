import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InviteSourceEnum } from '../utils/enums/InviteSourceEnum';
import { hashPassword } from '../utils/hash';
import { AlreadyInDB } from '../exceptions/errors';
import { PermissionService } from '../permission/permission.service';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private permissionService: PermissionService,
    private organizationService: OrganizationService,
  ) {}

  async getUserByEmail(userEmail) {
    const a = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    return a?.email;
  }

  async activateUser(userId) {}

  //@todo after  session implementation
  getUserSource(): InviteSourceEnum {
    return InviteSourceEnum.EMAIL;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async createNewUser(userInfo: {
    firstName: string;
    lastName: string;
    username: string;
    photo: string;
    email: string;
    password: string;
  }) {
    try {
      const password = await hashPassword(userInfo.password);
      const org = await this.organizationService.createNewOrg({
        name: 'new organization',
      });
      const permission = await this.permissionService.createAdmin();
      const source = this.getUserSource();

      const user = User.create({
        ...userInfo,
        password,
        permission: [permission],
        organization: [org],
        source,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new AlreadyInDB('Email already exists');
    }
  }
}
