import { CreateCodeFirstInput } from './create-code-first.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCodeFirstInput extends PartialType(CreateCodeFirstInput) {
  @Field(() => Int)
  id: number;
}
