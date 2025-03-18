// ✅ src/prisma/logging.middleware.ts
import { Prisma } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';
import { EventEmitter2 } from '@nestjs/event-emitter';

export const asyncLocalStorage = new AsyncLocalStorage<any>();

export const loggingMiddleware = (eventEmitter: EventEmitter2) => {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>,
  ) => {
    const result = await next(params);
    const store = asyncLocalStorage.getStore();

    // ✅ Crée un log uniquement si l'utilisateur est connecté (userId !== 0)
    if (params.model !== 'Log' && store?.userId) {
      eventEmitter.emit('prisma.log', {
        idUtilisateur: store.userId,
        action: `${params.action} on ${params.model}`,
        ip: store.ip || '0.0.0.0',
        details: params.args,
      });
    }

    return result;
  };
};

