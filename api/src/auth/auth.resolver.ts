import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../users/models/user';
import { GqlAuthGuard } from './gql-auth-guard';
import { CurrentUser } from './get-user.decorator';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  getAuthUser(@CurrentUser() user: User) {
    return this.authService.whoAmI(user);
  }
}
