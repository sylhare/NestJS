import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from './book.entity';

@ObjectType({ description: 'Author' })
export class Author {
  @Field({ description: 'name of the author' })
  name: string;
  @Field(() => [Book], { description: 'Author of the Book' })
  books: Book[];

  constructor() {
    this.books = [new Book(1), new Book(2)];
    this.name = 'author';
  }
}