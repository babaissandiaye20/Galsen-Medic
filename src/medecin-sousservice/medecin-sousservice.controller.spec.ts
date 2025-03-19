import { Test, TestingModule } from '@nestjs/testing';
import { MedecinSousserviceController } from './medecin-sousservice.controller';

describe('MedecinSousserviceController', () => {
  let controller: MedecinSousserviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedecinSousserviceController],
    }).compile();

    controller = module.get<MedecinSousserviceController>(MedecinSousserviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
