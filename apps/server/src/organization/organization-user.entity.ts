import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Organization } from './organization.entity';
import { UserOrgRoleEnum } from '../utils/enums/UserOrgRoleEnum';

@Entity()
export class OrganizationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.organizations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Organization, (org) => org.members)
  @JoinColumn({ name: 'org_id' })
  organization: Organization;

  @Column({ type: 'boolean', default: false })
  isOwner: boolean;

  @Column({
    type: 'enum',
    enum: UserOrgRoleEnum,
    default: UserOrgRoleEnum.MEMBER,
  })
  role: UserOrgRoleEnum;
}
