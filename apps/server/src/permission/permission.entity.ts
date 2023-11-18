import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Organization } from '../organization/organization.entity';

export type PermissionType = 'admin' | 'read' | 'update' | 'delete';
@Entity()
export class Permission {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['admin', 'read', 'update', 'delete'] })
  type: PermissionType;

  @Exclude()
  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  static create(permissionInfo: {
    organization?: Organization[];
    type: PermissionType;
  }) {
    const permission = new Permission();
    permission.type = permissionInfo.type;
    return permission;
  }
}
