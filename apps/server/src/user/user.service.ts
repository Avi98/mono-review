import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InviteSourceEnum } from '../utils/enums/InviteSourceEnum';
import { hashPassword } from '../utils/hash';
import { AlreadyInDB, NotInDB } from '../exceptions/errors';
import { PermissionService } from '../permission/permission.service';
import { OrganizationService } from '../organization/organization.service';
import { PermissionType } from '../permission/permission.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private permissionService: PermissionService,
    private organizationService: OrganizationService,
  ) {}

  async getUserByEmail(userEmail) {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    return user;
  }

  //@todo after  session implementation
  getUserSource(): InviteSourceEnum {
    return InviteSourceEnum.EMAIL;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById(userId: string) {
    return await this.userRepository.findOne({
      where: {
        id: Number(userId),
      },
    });
  }

  async createNewOrg(orgInfo: {
    orgName: string;
    userId: string;
    role: PermissionType;
  }) {
    const org = await this.organizationService.createNewOrg({
      name: orgInfo.orgName,
      userId: orgInfo.userId,
    });
    const user = await this.userRepository.findOne({
      where: {
        id: Number(orgInfo.userId),
      },
      relations: ['organization'],
    });

    if (!user) throw new NotInDB(`${orgInfo.userId} not found`);
    if (user.organization.find((org) => org.name === orgInfo.orgName))
      throw new AlreadyInDB(`${orgInfo.orgName} already exists`);

    user.organization.push(org);
    return await this.userRepository.save(user);
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

  async getUserOrgPermission(userId: string, orgId: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.organization', 'organization')
      .where('user.id = :id', { id: userId })
      .where('organization.id = :orgId', { orgId })
      .leftJoinAndSelect('user.permission', 'permission')
      .getMany();
  }
}
