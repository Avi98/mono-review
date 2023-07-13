import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  password: string;

  @CreateDateColumn({ default: () => 'now()', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'now()', name: 'updated_at' })
  updatedAt: Date;

  @Column({
    type: 'text',
  })
  photo: string | null;

  @Column({
    nullable: true,
    type: 'text',
  })
  email: string | null;

  @Column({
    type: 'enum',
    enumName: 'source',
    enum: ['invite', 'google', 'git', 'azure'],
    default: 'invite',
  })
  source: string;

  static create(userInfo: {
    firstName: string;
    lastName: string;
    photo: string;
    email: string;
    password: string;
    source: 'invite' | 'google' | 'git' | 'azure' | 'email';
  }) {
    const user = new User();
    user.firstName = userInfo.firstName;
    user.email = userInfo.email;
    user.lastName = userInfo.lastName;
    user.source = userInfo.source;
    user.photo = userInfo.photo;
    user.password = userInfo.password;
  }
}
