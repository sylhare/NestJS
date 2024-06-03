import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType('CreateUserInput')
export class CreateUserDto {
  @Field(() => String)
  @IsNotEmpty()
  name: string;
}