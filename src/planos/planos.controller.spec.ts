import { Test, TestingModule } from '@nestjs/testing';
import { PlanosController } from './planos.controller';

describe('PlanosController', () => {
  let controller: PlanosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanosController],
    }).compile();

    controller = module.get<PlanosController>(PlanosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
