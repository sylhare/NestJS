import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CodeFirst } from './entities/code-first.entity';
import { CreateCodeFirstInput } from './dto/create-code-first.input';
import { UpdateCodeFirstInput } from './dto/update-code-first.input';

@Resolver(() => CodeFirst)
export class CodeFirstResolver {

  @Mutation(() => CodeFirst)
  createCodeFirst(@Args('createCodeFirstInput') createCodeFirstInput: CreateCodeFirstInput) {
    return;
  }

  @Query(() => [CodeFirst], { name: 'codeFirst' })
  findAll() {
    return;
  }

  @Mutation(() => CodeFirst)
  updateCodeFirst(@Args('updateCodeFirstInput') updateCodeFirstInput: UpdateCodeFirstInput) {
    return;
  }
}
