import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Book' })
export class Book {
  @Field(() => Int, { description: 'Id of the Book' })
  id: number;
  @Field({ description: 'Title of the Book' })
  title: string;
  @Field({ description: 'Author of the Book' })
  author: string;

  constructor(id: number) {
    this.id = id;
    this.title = 'title';
    this.author = 'author';
  }
}