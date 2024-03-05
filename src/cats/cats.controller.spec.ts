import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsModule } from "./cats.module";

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find a kitty cat', () => {
    expect(controller.findOne('kitty')).toEqual('This action returns a #kitty cat');
  });

  it('should create a new cat', () => {
    expect(controller.create({ name: 'kitty', age: 1, breed: 'tabby' })).toEqual('A new cat was created!');
  });

  it('should find all cats', async () => {
    const cat = { name: 'Bobo', age: 5, breed: 'sphinx' };
    expect(controller.create(cat)).toEqual('A new cat was created!');
    await expect(controller.findAll()).resolves.toEqual([cat]);
  });
});
