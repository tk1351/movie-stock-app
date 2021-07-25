import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { User } from './user';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './types/types';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Token } from './token';
import { IMessage } from '../defaultType';
import { Message } from './message';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  getAllUsers(): Promise<IUser[]> {
    return this.usersService.getAllUsers();
  }

  @Query((returns) => User)
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.usersService.getUserById(id);
  }

  @Mutation((returns) => Message)
  createUser(@Args('user') createUserDto: CreateUserDto): Promise<IMessage> {
    return this.usersService.createUser(createUserDto);
  }

  @Mutation((returns) => Token)
  login(
    @Args('auth') authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.login(authCredentialsDto);
  }

  // @Mutation((returns) => Boolean)
  // async deleteUser(@Args({ name: 'id', type: () => Int }) id: number) {
  //   return this.usersService.deleteUser(id);
  // }
}
