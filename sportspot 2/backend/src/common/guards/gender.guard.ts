import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GENDER_PROTECTED_KEY } from '../decorators/gender-protected.decorator';

@Injectable()
export class GenderGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedGenders = this.reflector.getAllAndOverride<string[]>(
      GENDER_PROTECTED_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!allowedGenders) {
      return true; // No gender restriction on this endpoint
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!allowedGenders.includes(user.gender)) {
      throw new ForbiddenException('Your gender does not have access to this resource');
    }

    return true;
  }
}
