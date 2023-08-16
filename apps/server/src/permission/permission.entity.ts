import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
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
  @ManyToMany(() => User, (user) => user.permission)
  user: User[];

  @Exclude()
  @ManyToMany(() => Organization, (org) => org.permission)
  organization: Organization[];

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
    permission.organization = permissionInfo?.organization;
    permission.type = permissionInfo.type;
    permission.user = permissionInfo?.user;

    return permission;
  }
}
