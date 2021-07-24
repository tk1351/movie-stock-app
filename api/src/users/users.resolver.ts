import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { User } from './user';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Query((returns) => User)
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new NotFoundException(`id: ${id}のuserは存在しません`);
    return user;
  }

  @Mutation((returns) => User)
  createUser(@Args('newUser') createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Mutation((returns) => Boolean)
  async deleteUser(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.usersService.deleteUser(id);
  }
}
