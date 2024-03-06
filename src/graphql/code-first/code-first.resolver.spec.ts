import { Test, TestingModule } from '@nestjs/testing';
import { CodeFirstResolver } from './code-first.resolver';

describe('CodeFirstResolver', () => {
  let resolver: CodeFirstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeFirstResolver],
    }).compile();

    resolver = module.get<CodeFirstResolver>(CodeFirstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a code first', () => {
    const result = resolver.createCodeFirst({ exampleField: 'test' });
    expect(result).toEqual({ id: 1, exampleField: 'test' });
  });

  it('should find one code first', () => {
    const result = resolver.findOne(2);
    expect(result).toEqual({ id: 2, exampleField: 'example' });
  });

  it('should find all code first', () => {
    const result = resolver.findAll();
    expect(result).toEqual([{ id: 1, exampleField: 'example' }]);
  });

  it('should update a code first', () => {
    const result = resolver.updateCodeFirst({ exampleField: 'other' });
    expect(result).toEqual({ id: 1, exampleField: 'other' });
  });
});
