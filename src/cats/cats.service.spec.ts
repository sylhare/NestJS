import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cat', async () => {
    const cat = { name: 'Kitty', age: 5, breed: 'British Shorthair' };
    service.create(cat);
    await expect(service.findAll()).resolves.toEqual([cat]);
  });
});
