import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CodeFirst {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
