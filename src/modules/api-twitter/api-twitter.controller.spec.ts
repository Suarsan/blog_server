import { Test, TestingModule } from '@nestjs/testing';
import { ApiTwitterController } from './api-twitter.controller';

describe('ApiTwitterController', () => {
  let controller: ApiTwitterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiTwitterController],
    }).compile();

    controller = module.get<ApiTwitterController>(ApiTwitterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
