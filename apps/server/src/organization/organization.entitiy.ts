import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationUser } from '../organization-user/organization-user.enitiy';

@Entity({ name: 'organization' })
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  domain: string;

  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OrganizationUser, (orgUser) => orgUser.id)
  organizationUser: OrganizationUser[];

  static create(org: { name: string; organizationUsers?: OrganizationUser[] }) {
    const organization = new Organization();
    organization.name = org.name;
    organization.domain = '';
    organization.organizationUser = org.organizationUsers;
    return organization;
  }
}
