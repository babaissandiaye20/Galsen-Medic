import { Injectable } from '@nestjs/common';
import { InjectRedis} from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get<T = any>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    console.log('🔍 [Redis GET]', key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    const serialized = JSON.stringify(value);
    console.log('💾 [Redis SET]', key);
    if (ttlSeconds) {
      await this.redis.set(key, serialized, 'EX', ttlSeconds);
    } else {
      await this.redis.set(key, serialized);
    }
  }

  async del(key: string): Promise<void> {
    console.log('🗑️ [Redis DEL]', key);
    await this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key);
    return result === 1;
  }

  /**
   * Met en cache le résultat d'une fonction async, ou le récupère si déjà présent.
   */
  async cacheable<T>(
    key: string,
    ttlSeconds: number,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) return cached;

    const data = await fetcher();
    await this.set(key, data, ttlSeconds);
    return data;
  }
}
