import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrewsRepository } from './crews.repository';
import { Crew } from './models/crew';
import { IMessage } from '../defaultType';
import { CreateCrewsDto } from './dto/create-crews.dto';

@Injectable()
export class CrewsService {
  constructor(
    @InjectRepository(CrewsRepository)
    private crewsRepository: CrewsRepository,
  ) {}

  async getAllCrews(): Promise<Crew[]> {
    return await this.crewsRepository.find();
  }

  async createCrews(createCrewsDtos: CreateCrewsDto[]): Promise<Crew[]> {
    const newCrews = Promise.all(
      createCrewsDtos.map(async (createCrewsDto) => {
        const newCrew = await this.crewsRepository.createCrew(createCrewsDto);
        return newCrew;
      }),
    );
    return newCrews;
  }

  async deleteCrewsByMovieId(movieId: number): Promise<IMessage> {
    return await this.crewsRepository.deleteCrewsByMovieId(movieId);
  }
}
