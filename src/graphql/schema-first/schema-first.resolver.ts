import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SchemaFirst } from "./entities/schema-first.entity";
import { CreateSchemaFirstInput, CreateSchemaFirstPayload } from "./dto/schema-first.graphql";

@Resolver('SchemaFirst')
export class SchemaFirstResolver {

  @Mutation('createSchemaFirst')
  create(@Args('createSchemaFirstInput') createSchemaFirstInput: CreateSchemaFirstInput): CreateSchemaFirstPayload {
    const payload = new CreateSchemaFirstPayload();
    payload.schemaFirst = new SchemaFirst(undefined, createSchemaFirstInput.exampleField);
    return payload;
  }

  @Query('schemaFirst')
  findOne(@Args('id') id: number) {
    return new SchemaFirst(id);
  }
}
