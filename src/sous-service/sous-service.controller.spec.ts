import { Test, TestingModule } from '@nestjs/testing';
import { SousServiceController } from './sous-service.controller';

describe('SousServiceController', () => {
  let controller: SousServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SousServiceController],
    }).compile();

    controller = module.get<SousServiceController>(SousServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
