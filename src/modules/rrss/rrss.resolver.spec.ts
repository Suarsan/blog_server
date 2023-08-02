import { Test, TestingModule } from '@nestjs/testing';
import { RrssResolver } from './rrss.resolver';

describe('RrssResolver', () => {
  let controller: RrssResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RrssResolver],
    }).compile();

    controller = module.get<RrssResolver>(RrssResolver);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
