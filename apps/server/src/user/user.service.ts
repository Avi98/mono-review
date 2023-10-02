import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InviteSourceEnum } from '../utils/enums/InviteSourceEnum';
import { hashPassword } from '../utils/hash';
import { AlreadyInDB } from '../exceptions/errors';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private permissionService: PermissionService,
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

  async getUserById(userId: number) {
    return await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
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
      const permission = await this.permissionService.createAdmin();
      const source = this.getUserSource();

      const user = User.create({
        ...userInfo,
        password,
        // permission: [permission],
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
