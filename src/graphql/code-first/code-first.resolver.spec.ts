import { Test, TestingModule } from '@nestjs/testing';
import { CodeFirstResolver } from './code-first.resolver';
import { CodeFirstService } from './code-first.service';

describe('CodeFirstResolver', () => {
  let resolver: CodeFirstResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeFirstResolver, CodeFirstService],
    }).compile();

    resolver = module.get<CodeFirstResolver>(CodeFirstResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
