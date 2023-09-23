import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { verifyPassword } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) return null;
    const isValidPass = await verifyPassword(password, user.password);
    if (!isValidPass) return null;
    return user;
  }
}
