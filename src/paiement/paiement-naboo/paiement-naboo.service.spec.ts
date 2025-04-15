import { Test, TestingModule } from '@nestjs/testing';
import { PaiementNabooService } from './paiement-naboo.service';

describe('PaiementNabooService', () => {
  let service: PaiementNabooService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaiementNabooService],
    }).compile();

    service = module.get<PaiementNabooService>(PaiementNabooService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
