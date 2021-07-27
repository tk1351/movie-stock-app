import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Crew } from './models/crew';
import { CreateCrewsDto } from './dto/create-crews.dto';
import { IMessage } from '../defaultType';

@EntityRepository(Crew)
export class CrewsRepository extends Repository<Crew> {
  async createCrew(createCrewsDto: CreateCrewsDto): Promise<Crew> {
    const { category, name, movieId } = createCrewsDto;

    const crew = this.create();
    crew.category = category;
    crew.name = name;
    crew.movieId = movieId;

    try {
      await crew.save();
      return crew;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getCrewsByMovieId(movieId: number): Promise<Crew[]> {
    const found = await this.createQueryBuilder('crews')
      .where('crews.movieId = :movieId', { movieId })
      .getMany();

    return found;
  }

  async deleteCrew(id: number): Promise<IMessage> {
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`ID: ${id}のcrewは存在しません`);

    return { message: 'crewを削除しました' };
  }

  async deleteCrewsByMovieId(movieId: number): Promise<IMessage> {
    const targetCrews = await this.getCrewsByMovieId(movieId);

    if (targetCrews.length > 0) {
      targetCrews.map(
        async (targetCrew) => await this.delete({ id: targetCrew.id }),
      );
    }

    return { message: 'crewを削除しました' };
  }
}
