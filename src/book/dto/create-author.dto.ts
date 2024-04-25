import { IsNotEmpty, registerDecorator, ValidationOptions } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {

  @IsNotEmpty()
  @IsNotRobert()
  @Field(() => String)
  name: string;
}

export function IsNotRobert(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotRobert',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'name must not be Robert',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return value !== 'Robert';
        },
      },
    });
  };
}