import { Test, TestingModule } from '@nestjs/testing';
import { StatutReservationService } from './statut-reservation.service';

describe('StatutReservationService', () => {
  let service: StatutReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatutReservationService],
    }).compile();

    service = module.get<StatutReservationService>(StatutReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
