import { Test, TestingModule } from '@nestjs/testing';
import { ServiceB } from './b.service';
import { ServiceA } from '../a/a.service';

describe('ServiceB', () => {
  let service: ServiceB;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceB, ServiceA],
    }).compile();

    service = module.get<ServiceB>(ServiceB);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should do more stuff', () => {
    expect(service.doMoreStuff()).toBe('more stuff');
  });
});
