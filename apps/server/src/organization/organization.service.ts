import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';
import { AlreadyInDB } from '../exceptions/errors';


@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
  ) {}

  async createNewOrg(info: { name: string; userId?: string }) {
    if (info?.userId) {
      const orgNameExists = await this.orgRepository.find({
        where: { name: info.name, user: { id: Number(info.userId) } },
      });
      if (orgNameExists.length)
        throw new AlreadyInDB(`Organization name ${info.name} already exists`);
    }


    const organization = Organization.create(info);
    return await this.orgRepository.save(organization);
  }
}
