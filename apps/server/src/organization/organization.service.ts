import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './organization.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: Repository<Organization>,
  ) {}

  async createNewOrg(info: { name: string }) {
    const organization = Organization.create(info);
    return await this.orgRepository.save(organization);
  }
}
