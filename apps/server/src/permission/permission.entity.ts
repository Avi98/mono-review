import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
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
    user?: User[];
  }) {
    const permission = new Permission();
    permission.type = permissionInfo.type;

    return permission;
  }
}
