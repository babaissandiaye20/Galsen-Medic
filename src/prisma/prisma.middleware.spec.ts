import { PrismaMiddleware } from './prisma.middleware';

describe('PrismaMiddleware', () => {
  it('should be defined', () => {
    expect(new PrismaMiddleware()).toBeDefined();
  });
});
