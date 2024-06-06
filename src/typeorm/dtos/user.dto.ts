import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserDto {
  @Field(() => String)
  id: string;
  @Field(() => String)
  name: string;
}