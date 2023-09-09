import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission, PermissionType } from './permission.entity';
import { Repository } from 'typeorm';
import { InValidRoleType } from '../exceptions/errors';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createAdmin() {
    const perm = Permission.create({ type: 'admin' });
    return await this.permissionRepository.save(perm);
  }

  private async createRoleType(roleType: PermissionType) {
    const permission = Permission.create({ type: roleType });
    return this.permissionRepository.save(permission);
  }

  async createPermission(roleType: PermissionType) {
    switch (roleType) {
      case 'admin':
        return await this.createAdmin();
      case 'delete':
      case 'read':
      case 'update':
        return await this.createRoleType(roleType);
      default:
        throw new InValidRoleType('Invalid role provided');
    }
  }
}
