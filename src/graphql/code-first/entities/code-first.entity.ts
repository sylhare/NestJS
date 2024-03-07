import { ObjectType, Field, Int,  } from '@nestjs/graphql';

@ObjectType({ description: 'Code first example' })
export class CodeFirst {
  @Field(() => Int, { description: 'Example Id' })
  id: number;
  @Field(() => String, { description: 'Example Field' })
  exampleField: string;
  notAGraphQLField: string;

  constructor() {
    this.id = 1;
    this.exampleField = 'example';
    this.notAGraphQLField = 'not a graphql field';
  }
}
