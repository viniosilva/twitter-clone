import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import AuthService from '../../application/auth/AuthService';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;
    if (!authorization) return false;

    request.userId = this.authService.getUserIdFromJwtAuthorization(
      authorization,
    );

    return true;
  }
}
