import { IsNotEmpty, registerDecorator, ValidationOptions } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {

  @IsNotEmpty()
  @IsLongEnough()
  @IsNotRobert()
  @Field(() => String)
  name: string;
}

export function IsLongEnough(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongEnough',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'name is too short',
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return value.length > 3;
        },
      },
    });
  };
}

export function IsNotRobert(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNotRobert',
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