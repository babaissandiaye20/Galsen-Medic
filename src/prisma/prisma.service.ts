import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Connected to the database');
      // Ajoutez ce log pour vérifier les tables disponibles
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