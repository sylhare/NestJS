import { Test, TestingModule } from '@nestjs/testing';
import { ServiceA } from './a.service';

describe('ServiceA', () => {
  let service: ServiceA;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceA],
    }).compile();

    service = module.get<ServiceA>(ServiceA);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should do stuff', () => {
    expect(service.doStuff()).toBe('stuff');
  });
});
