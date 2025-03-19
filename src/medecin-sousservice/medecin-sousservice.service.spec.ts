import { Test, TestingModule } from '@nestjs/testing';
import { MedecinSousserviceService } from './medecin-sousservice.service';

describe('MedecinSousserviceService', () => {
  let service: MedecinSousserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedecinSousserviceService],
    }).compile();

    service = module.get<MedecinSousserviceService>(MedecinSousserviceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
