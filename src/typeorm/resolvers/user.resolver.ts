import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from '../dtos/user.dto';
import { DatabaseService } from '../database.service';
import { CreateUserDto } from '../dtos/user-input.dto';
import { Logger } from '@nestjs/common';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(
    private readonly userService: DatabaseService,
  ) {}

  @Query(() => [UserDto])
  async users() {
    return await this.userService.getUsers();
  }

  @Mutation(() => UserDto)
  async createUser(@Args('input') input: CreateUserDto) {
    Logger.log(`Creating user: ${JSON.stringify(input)}`);
    return await this.userService.createUser(input.name);
  }
}