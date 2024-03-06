import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCodeFirstInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
