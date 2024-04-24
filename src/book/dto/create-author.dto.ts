import { IsNotEmpty } from 'class-validator';
import { IsNotRobert } from '../entities/author.entity';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsNotRobert()
  name: string;
}