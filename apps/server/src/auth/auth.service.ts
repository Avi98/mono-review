import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../user/user-info.dto';
import { UserService } from '../user/user.service';
import { hashPassword } from 'src/utils/hash';
import { AlreadyInDB } from 'src/utils/errors';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser(userInfo: RegisterUserDto) {
    if (await this.alreadyExistsUser(userInfo.email)) {
      throw new AlreadyInDB('Email Already exists');
    }
    const password = await hashPassword(userInfo.password);
    const user = {
      ...userInfo,
      password,
      source: this.getUserSource(),
    };
    this.userService.createUser(user);
  }

  async alreadyExistsUser(email: string) {
    try {
      await this.userService.getUserByEmail(email);
      return true;
    } catch (error) {
      return false;
    }
  }

  //@todo after  session implementation
  private getUserSource(): 'invite' | 'google' | 'git' | 'azure' | 'email' {
    return 'email';
  }

  signIn(username: string, password: string) {}
}
