import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { OrganizationUser } from '../organization-user/organization-user.entity';

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
  org_user: OrganizationUser[];

  @ManyToMany(() => Permission, (permission) => permission.user)
  @JoinTable({ name: 'user_permission' })
  permission: Permission[];

  static create(userInfo: {
    firstName: string;
    lastName: string;
    photo: string;
    email: string;
    password: string;
    username: string;
    permission: Permission[];
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
    user.permission = userInfo.permission;

    return user;
  }
}
