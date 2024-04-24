import { Args, Context, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Book } from './entities/book.entity';
import { Logger } from '@nestjs/common';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.dto';

@Resolver(() => Book)
export class BookResolver {
  @Query(() => Book, { name: 'book' })
  async getBook(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { hello: string },
  ) {
    new Logger('Resolver').log(context.hello);
    return new Book(id);
  }

  @ResolveField('author', () => Author)
  async getAuthor() {
    return new Author();
  }
}

@Resolver(() => Author)
export class AuthorResolver {

  @ResolveField('books', () => [Book])
  async getBooks(@Parent() author: Author): Promise<Book[]> {
    return author.books;
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') input: CreateAuthorInput): Promise<Author> {
    return new Author(input.name);
  }
}