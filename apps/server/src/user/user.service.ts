import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(userEmail) {
    await this.userRepository.find({ where: { email: userEmail } });
  }

  async createUser(userInfo: {
    firstName: string;
    lastName: string;
    photo: string;
    email: string;
    password: string;
    source: 'invite' | 'google' | 'git' | 'azure' | 'email';
  }) {
    User.create(userInfo);
    this.userRepository.save(userInfo);
  }
}
