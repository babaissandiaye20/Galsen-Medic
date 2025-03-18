// src/log-listener/log-listener.ts
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LogService } from '../log/log.service';

@Injectable()
export class LogListener {
  constructor(private readonly logService: LogService) {}

  @OnEvent('prisma.log')
  async handlePrismaLogEvent(payload: {
    idUtilisateur: number;
    action: string;
    ip: string;
    details?: any;
  }) {
    await this.logService.createLog(payload);
  }
}
