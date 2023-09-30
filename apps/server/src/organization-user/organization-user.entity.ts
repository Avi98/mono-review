import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatusEnum } from '../utils/enums/UserStatusEnum';
import { User } from '../user/user.entity';
import { UserOrgRoleEnum } from '../utils/enums/UserOrgRoleEnum';
import { Organization } from '../organization/organization.entity';

@Entity({ name: 'org_user' })
export class OrganizationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enumName: 'status',
    enum: UserStatusEnum,
    default: UserStatusEnum.INACTIVE,
  })
  status: UserStatusEnum;

  @Column()
  invitationToken: string;

  @Column({
    type: 'enum',
    enumName: 'role',
    enum: UserOrgRoleEnum,
    default: UserOrgRoleEnum.MEMBER,
  })
  role: UserOrgRoleEnum;

  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()', name: 'update_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.org_user)
  user: User;

  @ManyToOne(() => Organization, (org) => org.org_user)
  organization: Organization;

  static create(orgUserInfo: {
    name: string;
    status: UserStatusEnum;
    invitationToken: string;
    organization: Organization;
    user: User;
  }) {
    const organizationUser = new OrganizationUser();
    organizationUser.status = orgUserInfo.status;
    organizationUser.invitationToken = orgUserInfo.invitationToken;
    organizationUser.organization = orgUserInfo.organization;
    organizationUser.user = orgUserInfo.user;
    return organizationUser;
  }
}
