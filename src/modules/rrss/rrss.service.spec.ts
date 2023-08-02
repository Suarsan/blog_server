import { Test, TestingModule } from '@nestjs/testing';
import { RrssService } from './rrss.service';

describe('RrssService', () => {
  let service: RrssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RrssService],
    }).compile();

    service = module.get<RrssService>(RrssService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
