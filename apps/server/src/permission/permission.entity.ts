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
  @JoinTable({ name: 'permission_user' })
  user: User[];

  @Exclude()
  @ManyToMany(() => Organization, (org) => org.permission)
  @JoinTable({ name: 'permission_organization' })
  organization: Organization[];

  @Exclude()
  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;
}
