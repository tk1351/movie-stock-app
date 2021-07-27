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
import { TagsRepository } from 'src/tags/tags.repository';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getAllMovies(): Promise<Movie[]> {
    const result = this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.user', 'user')
      .leftJoinAndSelect('movies.crews', 'crews')
      .leftJoinAndSelect('movies.tags', 'tags')
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
      .leftJoinAndSelect('movies.crews', 'crews')
      .leftJoinAndSelect('movies.tags', 'tags')
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
      .leftJoinAndSelect('movies.crews', 'crews')
      .leftJoinAndSelect('movies.tags', 'tags')
      .where('user.id = :id', { id })
      .orderBy('movies.createdAt', 'DESC');

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
    const tagsRepository = getCustomRepository(TagsRepository);

    const foundUser = await usersRepository.findOne(user.id);

    if (foundUser.role !== 'user')
      throw new UnauthorizedException('権限がありません');

    const {
      title,
      release,
      time,
      originCountry,
      productionCompany,
      crews,
      tags,
    } = createMovieDto;

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

    tags.map((tag) =>
      tagsRepository.createTag({
        text: tag.text,
        movieId: newMovie.id,
      }),
    );

    try {
      return { message: '映画の登録が完了しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMovie(id: number, user: User): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);
    const crewsRepository = getCustomRepository(CrewsRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    const movie = await this.getMovieById(id);
    const foundUser = await usersRepository.findOne(user.id);
    if (movie.user.id !== foundUser.id)
      throw new UnauthorizedException('権限がありません');

    const crewsIndex = await crewsRepository.getCrewsByMovieId(id);
    const tagsIndex = await tagsRepository.getTagsByMovieId(id);

    crewsIndex.map((index) => crewsRepository.deleteCrew(index.id));
    tagsIndex.map((index) => tagsRepository.deleteTag(index.id));

    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`ID: ${id}のmovieは存在しません`);

    return { message: 'movieを削除しました' };
  }
}
