import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';
import { AlreadyInDB } from '../exceptions/errors';
import { User } from '../user/user.entity';
import { OrganizationUserService } from '../organization-user/organization-user.service';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
    private org_user: OrganizationUserService,
  ) {}

  async createNewOrg(info: { name: string; userId: string }) {
    try {
      const userOrgs = await this.findUserOrganization(info.userId);
      const userOrgsName = [];
      for (const orgId in userOrgs) {
        const name = await this.getOrgById(orgId);
        userOrgsName.push(name);
      }
      if (userOrgsName.includes(info.name))
        throw new AlreadyInDB(`Organization name ${info.name} already exists`);

      const organization = Organization.create(info);
      return await this.orgRepository.save(organization);
    } catch (error) {
      throw error;
    }
  }

  async getOrgById(orgId) {
    return await this.orgRepository
      .createQueryBuilder('organization')
      .select('name')
      .where('id = :id', { id: orgId })
      .getOne();
  }

  async findUserOrganization(userId: string) {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.org_user', 'org_user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }
  async getOrganizationUser(orgId: string) {
    const organizationUser = await this.orgRepository
      .createQueryBuilder('organization')
      .innerJoin('org_user.organization', 'organization')
      .innerJoin('users', 'user')
      .where('organization.id = :id', { id: orgId })
      .getMany();

    return organizationUser;
  }
}
