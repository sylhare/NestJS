import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'New example field input' })
export class CreateCodeFirstInput {
  @Field(() => String, { description: 'Example field to create' })
  exampleField: string;
}
