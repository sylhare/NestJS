import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from './book.entity';

@ObjectType({ description: 'Author' })
export class Author {

  @Field({ description: 'name of the author' })
  name: string;

  /**
   * Resolve via field resolver
   * No need for:
   * @Field(() => [Book], { description: 'Books of the author' })
   */
  books: Book[];

  constructor(name?: string) {
    this.books = [new Book(1), new Book(2)];
    this.name = name ?? 'author';
  }
}