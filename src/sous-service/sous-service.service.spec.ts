import { Test, TestingModule } from '@nestjs/testing';
import { SousServiceService } from './sous-service.service';

describe('SousServiceService', () => {
  let service: SousServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SousServiceService],
    }).compile();

    service = module.get<SousServiceService>(SousServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
