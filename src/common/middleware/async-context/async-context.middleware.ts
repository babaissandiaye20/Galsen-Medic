import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { asyncLocalStorage } from '../../../prisma/prisma.middleware';

@Injectable()
export class AsyncContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // req.user est disponible si l'authentification (ex. JwtAuthGuard) est déjà appliquée
    const context = {
      userId: req.user?.id || 0, // 0 (ou une autre valeur) si non authentifié
      ip: req.ip,
    };

    // @ts-ignore
    asyncLocalStorage.run(context, () => {
      next();
    });
  }
}
