import { CreateCodeFirstInput } from './create-code-first.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType({ description: 'Update example field input' })
export class UpdateCodeFirstInput extends PartialType(CreateCodeFirstInput) {
  @Field(() => String, { description: 'Example field to update' })
  exampleField: string;
}
