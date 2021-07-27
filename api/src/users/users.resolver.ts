import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { User } from './models/user';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './types/types';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Token } from './models/token';
import { IMessage } from '../defaultType';
import { Message } from './models/message';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  getAllUsers(): Promise<IUser[]> {
    return this.usersService.getAllUsers();
  }

  @Query(() => User)
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.usersService.getUserById(id);
  }

  @Mutation(() => Message)
  createUser(@Args('user') createUserDto: CreateUserDto): Promise<IMessage> {
    return this.usersService.createUser(createUserDto);
  }

  @Mutation(() => Token)
  login(
    @Args('auth') authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.login(authCredentialsDto);
  }
}
