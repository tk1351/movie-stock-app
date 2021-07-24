import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }
}
