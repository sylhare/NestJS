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