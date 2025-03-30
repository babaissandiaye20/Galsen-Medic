import { Test, TestingModule } from '@nestjs/testing';
import { TarifController } from './tarif.controller';

describe('TarifController', () => {
  let controller: TarifController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarifController],
    }).compile();

    controller = module.get<TarifController>(TarifController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
