// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { loggingMiddleware } from './prisma.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private eventEmitter: EventEmitter2) {
    super();
    // Enregistre le middleware Prisma
    this.$use(loggingMiddleware(this.eventEmitter));
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Connected to the database');
      console.log('Available models:', Object.keys(this));
    } catch (error) {
      console.error('Failed to connect to the database', error);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
