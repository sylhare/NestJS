import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from './book.entity';
import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ObjectType({ description: 'Author' })
export class Author {
  @IsNotRobert()
  @Field({ description: 'name of the author' })
  name: string;
  @Field(() => [Book], { description: 'Author of the Book' })
  books: Book[];

  constructor(name?: string) {
    this.books = [new Book(1), new Book(2)];
    this.name = name ?? 'author';
  }
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