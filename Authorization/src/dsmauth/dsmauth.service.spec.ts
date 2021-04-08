import { Test, TestingModule } from '@nestjs/testing';
import { DsmauthService } from './dsmauth.service';

describe('DsmauthService', () => {
  let service: DsmauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DsmauthService],
    }).compile();

    service = module.get<DsmauthService>(DsmauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
