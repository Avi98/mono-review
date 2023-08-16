import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../user/user.entity';
import { Permission } from '../permission/permission.entity';
import { randomUUID } from 'crypto';

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

  @Column({ name: 'invite_token', default: randomUUID(), nullable: false })
  invitationToken: string;

  @Exclude()
  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Permission, (permission) => permission.organization)
  @JoinTable({ name: 'permission_organization' })
  permission: Permission[];

  @ManyToMany(() => User, (user) => user.organization)
  @JoinTable({ name: 'org_user' })
  user: User[];

  static create(org: { name: string; user?: User[] }) {
    const organization = new Organization();
    organization.name = org.name;
    organization.domain = '';
    organization.user = org.user;
    return organization;
  }
}
