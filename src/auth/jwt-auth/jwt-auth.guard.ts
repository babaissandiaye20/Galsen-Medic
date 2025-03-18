import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {ResponseService} from '../../validation/exception/response/response.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly responseService: ResponseService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      // @ts-ignore
      throw new UnauthorizedException(
        this.responseService.forbidden('Vous devez être authentifié pour accéder à cette ressource.')
      );
    }
    return user;
  }
}
