import {
  InternalServerErrorException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Movie } from './models/movie';
import { IMessage } from '../defaultType';
import { CreateMovieDto } from './dto/create-movie.dto';
import { User } from '../users/models/user';
import { UsersRepository } from '../users/users.repository';
import { CrewsRepository } from '../crews/crews.repository';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getAllMovies(): Promise<Movie[]> {
    const result = this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.user', 'user')
      .orderBy('movies.createdAt', 'DESC');

    try {
      const movies = await result.getMany();
      return movies;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getMovieById(id: number): Promise<Movie> {
    const result = this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.user', 'user')
      .where('movies.id = :id', { id });

    try {
      const movie = await result.getOne();
      return movie;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getMoviesByUserId(id: number): Promise<Movie[]> {
    const result = this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.user', 'user')
      .where('user.id = :id', { id });

    if (!result)
      throw new NotFoundException(`userId: ${id}のmovieは存在しません`);

    try {
      const movies = await result.getMany();
      return movies;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async createMovie(
    createMovieDto: CreateMovieDto,
    user: User,
  ): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);
    const crewsRepository = getCustomRepository(CrewsRepository);

    const foundUser = await usersRepository.findOne(user.id);

    if (foundUser.role !== 'user')
      throw new UnauthorizedException('権限がありません');

    const { title, release, time, originCountry, productionCompany, crews } =
      createMovieDto;

    const movie = this.create();
    movie.title = title;
    movie.release = release;
    movie.time = time;
    movie.originCountry = originCountry;
    movie.productionCompany = productionCompany;
    movie.user = foundUser;

    const newMovie = await movie.save();

    crews.map((crew) =>
      crewsRepository.createCrew({
        category: crew.category,
        name: crew.name,
        movieId: newMovie.id,
      }),
    );

    try {
      delete movie.crews;
      return { message: '映画の登録が完了しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
