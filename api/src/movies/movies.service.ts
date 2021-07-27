import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { CreateMovieDto } from './dto/create-movie.dto';
import { IMessage } from '../defaultType';
import { User } from '../users/models/user';
import { Movie } from './models/movie';
import { UsersService } from '../users/users.service';
import { CrewsService } from '../crews/crews.service';
import { TagsService } from '../tags/tags.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MoviesRepository)
    private moviesRepository: MoviesRepository,
    private usersService: UsersService,
    private crewsService: CrewsService,
    private tagsService: TagsService,
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

  async deleteMovie(id: number, user: User): Promise<IMessage> {
    return await this.moviesRepository.deleteMovie(id, user);
  }

  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
    user: User,
  ): Promise<IMessage> {
    const movie = await this.getMovieById(id);
    if (!movie) throw new NotFoundException(`ID: ${id}のmovieは存在しません`);

    const foundUser = await this.usersService.getUserById(user.id);
    if (movie.user.id !== foundUser.id)
      throw new UnauthorizedException('権限がありません');

    const {
      title,
      release,
      time,
      originCountry,
      productionCompany,
      crews,
      tags,
    } = updateMovieDto;

    movie.title = title;
    movie.release = release;
    movie.time = time;
    movie.originCountry = originCountry;
    movie.productionCompany = productionCompany;

    await this.crewsService.deleteCrewsByMovieId(id);

    const createCrewsDtos = crews.map((crew) => {
      return { ...crew, movieId: movie.id };
    });
    const newCrews = await this.crewsService.createCrews(createCrewsDtos);
    movie.crews = newCrews;

    await this.tagsService.deleteTagsByMovieId(id);

    const createTagsDtos = tags.map((tag) => {
      return { ...tag, movieId: movie.id };
    });
    const newTags = await this.tagsService.createTags(createTagsDtos);
    movie.tags = newTags;

    await this.moviesRepository.save(movie);

    return { message: 'movieの更新が完了しました' };
  }
}
