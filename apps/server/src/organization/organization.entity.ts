import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'organization' })
export class Organization {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Exclude()
  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  // @OneToMany(
  //   () => OrganizationUser,
  //   (organizationUser) => organizationUser.organization,
  // )
  // org_user: OrganizationUser;

  static create(org: { name: string; slug: string }) {
    const organization = new Organization();
    organization.name = org.name;
    organization.slug = org.slug;
    return organization;
  }
}
