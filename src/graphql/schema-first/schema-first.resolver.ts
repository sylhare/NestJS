import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SchemaFirst } from './entities/schema-first.entity';
import { CreateSchemaFirstInput, CreateSchemaFirstPayload } from './dto/schema-first.graphql';

@Resolver('SchemaFirst')
export class SchemaFirstResolver {

  @Mutation(() => CreateSchemaFirstPayload, { name: 'createSchemaFirst' })
  create(@Args('createSchemaFirstInput') createSchemaFirstInput: CreateSchemaFirstInput): CreateSchemaFirstPayload {
    const payload = new CreateSchemaFirstPayload();
    payload.schemaFirst = new SchemaFirst(undefined, createSchemaFirstInput.exampleField);
    return payload;
  }

  @Query(() => SchemaFirst, { name: 'schemaFirst' })
  findOne(@Args('id', { type: () => Int }) id: number): SchemaFirst {
    return new SchemaFirst(id);
  }
}
