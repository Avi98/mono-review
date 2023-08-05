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

  @Column({ name: 'invite_token' })
  invitationToken: string;

  @Exclude()
  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Permission, (permission) => permission.organization)
  permission: Permission[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'org_user' })
  users: User[];

  static create(org: { name: string; user?: User[] }) {
    const organization = new Organization();
    organization.name = org.name;
    organization.domain = '';
    organization.users = org.user;
    return organization;
  }
}
