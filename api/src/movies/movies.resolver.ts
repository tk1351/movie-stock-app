import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Movie } from './models/movie';
import { MoviesService } from './movies.service';
import { IMovie } from './types/types';
import { Message } from '../users/models/message';
import { IMessage } from '../defaultType';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GqlAuthGuard } from '../auth/gql-auth-guard';
import { CurrentUser } from '../auth/get-user.decorator';
import { User } from '../users/models/user';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private moviesService: MoviesService) {}

  @Query(() => [Movie])
  async getAllMovies(): Promise<IMovie[]> {
    return await this.moviesService.getAllMovies();
  }

  @Query(() => Movie)
  async getMovieById(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.moviesService.getMovieById(id);
  }

  @Query(() => [Movie])
  async getMoviesByUserId(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.moviesService.getMoviesByUserId(id);
  }

  @Mutation(() => Message)
  @UseGuards(GqlAuthGuard)
  createMovie(
    @Args('movie') createMovieDto: CreateMovieDto,
    @CurrentUser() user: User,
  ): Promise<IMessage> {
    return this.moviesService.createMovie(createMovieDto, user);
  }
}
