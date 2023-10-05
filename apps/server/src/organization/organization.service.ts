import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { DataSource, Repository, Transaction } from 'typeorm';
import { User } from '../user/user.entity';
import { OrganizationUser } from './organization-user.entity';
import { UserOrgRoleEnum } from '../utils/enums/UserOrgRoleEnum';
import { NotInDB } from '../exceptions/errors';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
    @InjectRepository(OrganizationUser)
    private orgUserRepository: Repository<OrganizationUser>,
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async createNewOrg(org: { name: string; owner: User; slug }) {
    try {
      const organization = Organization.create({
        name: org.name,
        slug: org.slug,
      });

      organization.owner = org.owner;
      const orgSaved = await this.orgRepository.save(organization);
      const orgUser = this.orgUserRepository.create({
        isOwner: true,
        role: UserOrgRoleEnum.ADMIN,
      });
      orgUser.organization = orgSaved;
      orgUser.user = org.owner;
      await this.orgUserRepository.save(orgUser);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  async addMemberToOrg(user: User, orgId: string) {
    const org = await this.orgRepository.findOneBy({ id: orgId });
    const orgUser = this.orgUserRepository.create({
      role: UserOrgRoleEnum.MEMBER,
      isOwner: false,
    });

    orgUser.user = user;
    org.members = [await this.orgUserRepository.save(orgUser)];

    await this.orgRepository.save(org);
    return `userId: ${user.firstName || user.username} saved for ${org.name}`;
  }

  async getAllMembers(orgId: string) {
    if (!(await this.orgRepository.exist({ where: { id: orgId } })))
      throw new NotInDB(`Organization_id: ${orgId} does not exists`);

    return await this.orgUserRepository
      .createQueryBuilder('org_user')
      .innerJoin('user', 'user', 'user.id = org_user.user_id')
      .where('org_user.org_id = :id', { id: orgId })
      .addSelect([
        'user.email',
        'org_user.role',
        'user.firstName',
        'user.lastName',
      ])
      .getRawMany();
  }

  async removeMemberFromOrg(userId: string) {
    return '';
  }

  async getAllOrgMembers(orgId: string) {
    return '';
  }
}
