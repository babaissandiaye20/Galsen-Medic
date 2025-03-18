import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { asyncLocalStorage } from '../prisma/prisma.middleware';

@Injectable()
export class AsyncContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const store = {
      userId: request.user?.id, // Jamais zéro. Ne crée rien sinon.
      ip: request.ip,
    };

    if (!store.userId) {
      return next.handle(); // Pas d'utilisateur, on ne stocke rien
    }

    return asyncLocalStorage.run(store, () => next.handle());
  }
}
