import { AsyncContextMiddleware } from './async-context.middleware';

describe('AsyncContextMiddleware', () => {
  it('should be defined', () => {
    expect(new AsyncContextMiddleware()).toBeDefined();
  });
});
