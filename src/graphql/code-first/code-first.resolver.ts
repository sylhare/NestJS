import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CodeFirst } from './entities/code-first.entity';
import { CreateCodeFirstInput } from './dto/create-code-first.input';
import { UpdateCodeFirstInput } from './dto/update-code-first.input';
import { GraphqlInterceptor } from '../graphql-rate-limiter/graphql-interceptor.interceptor';
import { UseInterceptors } from '@nestjs/common';

@UseInterceptors(GraphqlInterceptor)
@Resolver(() => CodeFirst)
export class CodeFirstResolver {

  @Mutation(() => CodeFirst)
  createCodeFirst(@Args('createCodeFirstInput') createCodeFirstInput: CreateCodeFirstInput) {
    return { ...new CodeFirst(), exampleField: createCodeFirstInput.exampleField };
  }

  @Query(() => [CodeFirst], { name: 'codeFirsts' })
  findAll() {
    return [new CodeFirst()];
  }

  @Query(() => CodeFirst, { name: 'codeFirst' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return { ...new CodeFirst(), id };
  }

  @Mutation(() => CodeFirst)
  updateCodeFirst(@Args('updateCodeFirstInput') updateCodeFirstInput: UpdateCodeFirstInput) {
    return { ...new CodeFirst(), exampleField: updateCodeFirstInput.exampleField };
  }
}
