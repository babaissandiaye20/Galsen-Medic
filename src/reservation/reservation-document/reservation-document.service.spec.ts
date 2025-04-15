import { Test, TestingModule } from '@nestjs/testing';
import { ReservationDocumentService } from './reservation-document.service';

describe('ReservationDocumentService', () => {
  let service: ReservationDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationDocumentService],
    }).compile();

    service = module.get<ReservationDocumentService>(ReservationDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
