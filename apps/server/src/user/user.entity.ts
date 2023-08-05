import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrganizationUser } from '../organization-user/organization-user.enitiy';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @Column({
    nullable: false,
  })
  password: string;

  @Exclude()
  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'text',
  })
  photo: string | null;

  @Column({
    nullable: false,
    unique: true,
    type: 'text',
  })
  email: string | null;

  @Column({
    type: 'enum',
    enumName: 'source',
    enum: ['invite', 'google', 'git', 'azure', 'email'],
    default: 'invite',
  })
  source: string;

  @OneToMany(() => OrganizationUser, (orgUser) => orgUser.user)
  organizationUser: OrganizationUser[];

  static create(userInfo: {
    firstName: string;
    lastName: string;
    photo: string;
    email: string;
    password: string;
    username: string;
    orgUser?: OrganizationUser;
    source: 'invite' | 'google' | 'git' | 'azure' | 'email';
  }) {
    const user = new User();
    user.firstName = userInfo.firstName;
    user.email = userInfo.email;
    user.lastName = userInfo.lastName;
    user.source = userInfo.source;
    user.photo = userInfo.photo;
    user.password = userInfo.password;
    user.username = userInfo.username;
    user.organizationUser = [userInfo.orgUser];
    return user;
  }
}
