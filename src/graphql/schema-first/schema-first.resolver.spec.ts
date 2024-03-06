import { Test, TestingModule } from '@nestjs/testing';
import { SchemaFirstResolver } from './schema-first.resolver';

describe('SchemaFirstResolver', () => {
  let resolver: SchemaFirstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchemaFirstResolver],
    }).compile();

    resolver = module.get<SchemaFirstResolver>(SchemaFirstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a new SchemaFirst', () => {
    const exampleField = 'exampleField';
    const result = resolver.create({ exampleField });
    expect(result.schemaFirst).toBeDefined();
    expect(result.schemaFirst.exampleField).toBe(exampleField);
  });

  it('should find a SchemaFirst', () => {
    const id = 1;
    const result = resolver.findOne(id);
    expect(result).toBeDefined();
    expect(result.id).toBe(id);
  });
});
