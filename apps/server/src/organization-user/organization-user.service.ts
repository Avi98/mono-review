import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationUser } from './organization-user.enitiy';
import { UserStatusEnum } from '../utils/enums/UserStatusEnum';
import { Organization } from '../organization/organization.entitiy';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationUserService {
  constructor(
    @InjectRepository(OrganizationUser)
    private userOrgRepo: Repository<OrganizationUser>,
  ) {}

  async createUserOrg(userOrg: {
    name: string;
    status: UserStatusEnum;
    invitationToken: string;
    organization: Organization;
    user: User;
  }) {
    const userInactive = await this.userOrgRepo
      .createQueryBuilder('org_user')
      .where('user.id = :id', { id: userOrg.user.id })
      .andWhere('status = :status', { status: UserStatusEnum.INACTIVE })
      .getExists();
    if (userInactive) throw new BadRequestException('User has been inactive');

    const userOrganization = OrganizationUser.create(userOrg);
    this.userOrgRepo.save(userOrganization);
  }
}
