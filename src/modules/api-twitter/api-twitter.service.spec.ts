import { Test, TestingModule } from '@nestjs/testing';
import { ApiTwitterService } from './api-twitter.service';

describe('ApiTwitterService', () => {
  let service: ApiTwitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiTwitterService],
    }).compile();

    service = module.get<ApiTwitterService>(ApiTwitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
