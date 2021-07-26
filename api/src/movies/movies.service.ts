import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { IMessage } from '../defaultType';
import { User } from '../users/models/user';
import { Movie } from './models/movie';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
  ) {}

  getAllMovies(): Promise<Movie[]> {
    return this.moviesRepository.getAllMovies();
  }

  async getMovieById(id: number): Promise<Movie> {
    return this.moviesRepository.getMovieById(id);
  }

  async getMoviesByUserId(id: number): Promise<Movie[]> {
    return this.moviesRepository.getMoviesByUserId(id);
  }

  async createMovie(
    createMovieDto: CreateMovieDto,
    user: User,
  ): Promise<IMessage> {
    return await this.moviesRepository.createMovie(createMovieDto, user);
  }
}
