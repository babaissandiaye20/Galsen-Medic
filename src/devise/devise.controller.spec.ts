import { Test, TestingModule } from '@nestjs/testing';
import { DeviseController } from './devise.controller';

describe('DeviseController', () => {
  let controller: DeviseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviseController],
    }).compile();

    controller = module.get<DeviseController>(DeviseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
