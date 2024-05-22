import { Field, InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';

@InputType({ description: 'New example field input' })
export class CreateCodeFirstInput {
  @Field(() => String, { description: 'Example field to create' })
  @Allow() // When pipe validation's whitelist is true, the field is allowed
  exampleField: string;
}
