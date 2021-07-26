import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrewsRepository } from './crews.repository';
import { Crew } from './models/crew';

@Injectable()
export class CrewsService {
  constructor(
    @InjectRepository(CrewsRepository)
    private crewsRepository: CrewsRepository,
  ) {}

  async getAllCrews(): Promise<Crew[]> {
    return await this.crewsRepository.getAllCrews();
  }
}
