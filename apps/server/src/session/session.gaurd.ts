import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NotInDB } from 'src/exceptions/errors';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.session) throw new UnauthorizedException('Session not found');

    try {
      await this.userService.getUserByEmail(request.session.email);
      return true;
    } catch (error) {
      if (error instanceof NotInDB) {
        throw new UnauthorizedException('User session is not valid');
      }
      throw error;
    }
  }
}
