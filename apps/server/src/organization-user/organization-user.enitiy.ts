import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserStatusEnum } from '../utils/enums/UserStatusEnum';
import { User } from '../user/user.entity';
import { Organization } from '../organization/organization.entitiy';

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

  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()', name: 'update_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Organization, (org) => org.id)
  @JoinColumn({ name: 'org_id' })
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
