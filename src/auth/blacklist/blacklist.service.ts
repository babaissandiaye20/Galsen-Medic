import { Injectable } from '@nestjs/common';
import {PrismaService} from '../../prisma/prisma.service';

@Injectable()
export class BlacklistService {
  constructor(private readonly prisma: PrismaService) {}

  async blacklistToken(token: string, expiresAt: Date) {
    return this.prisma.blacklistedToken.create({
      data: {
        token,
        expiresAt,
      },
    });
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await this.prisma.blacklistedToken.findUnique({
      where: { token },
    });
    return !!result;
  }
}
