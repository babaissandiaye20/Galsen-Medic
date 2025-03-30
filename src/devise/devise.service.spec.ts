import { Test, TestingModule } from '@nestjs/testing';
import { DeviseService } from './devise.service';

describe('DeviseService', () => {
  let service: DeviseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviseService],
    }).compile();

    service = module.get<DeviseService>(DeviseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
