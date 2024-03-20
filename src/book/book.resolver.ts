import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';
import { Book } from './entities/book.entity';
import { Logger } from '@nestjs/common';

@Resolver()
export class BookResolver {
  @Query(() => Book, { name: 'book' })
  async getBook(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { hello: string },
  ) {
    new Logger('Resolver').log(context.hello);
    return new Book(id);
  }
}
