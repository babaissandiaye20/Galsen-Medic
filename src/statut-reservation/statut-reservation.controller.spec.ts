import { Test, TestingModule } from '@nestjs/testing';
import { StatutReservationController } from './statut-reservation.controller';

describe('StatutReservationController', () => {
  let controller: StatutReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatutReservationController],
    }).compile();

    controller = module.get<StatutReservationController>(StatutReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
