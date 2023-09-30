import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../user/user.entity';
import { Permission } from '../permission/permission.entity';
import { OrganizationUser } from '../organization-user/organization-user.entity';

@Entity({ name: 'organization' })
export class Organization {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  domain: string;

  @Exclude()
  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => OrganizationUser,
    (organizationUser) => organizationUser.organization,
  )
  org_user: OrganizationUser;

  @ManyToMany(() => Permission, (permission) => permission.organization)
  @JoinTable({ name: 'permission_organization' })
  permission: Permission[];

  static create(org: { name: string; user?: User[] }) {
    const organization = new Organization();
    organization.name = org.name;
    organization.domain = '';
    return organization;
  }
}
