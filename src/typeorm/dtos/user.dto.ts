import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
}