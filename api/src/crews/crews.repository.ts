import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Crew } from './models/crew';
import { CreateCrewsDto } from './dto/create-crews.dto';

@EntityRepository(Crew)
export class CrewsRepository extends Repository<Crew> {
  async getAllCrews(): Promise<Crew[]> {
    return await this.find();
  }

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
}
