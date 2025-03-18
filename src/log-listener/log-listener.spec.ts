import { Test, TestingModule } from '@nestjs/testing';
import { LogListener } from './log-listener';

describe('LogListener', () => {
  let provider: LogListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogListener],
    }).compile();

    provider = module.get<LogListener>(LogListener);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
