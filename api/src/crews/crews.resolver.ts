import { Resolver, Query } from '@nestjs/graphql';
import { Crew } from './models/crew';
import { CrewsService } from './crews.service';

@Resolver(() => Crew)
export class CrewsResolver {
  constructor(private crewsService: CrewsService) {}

  @Query(() => [Crew])
  async getAllCrews(): Promise<Crew[]> {
    return await this.crewsService.getAllCrews();
  }
}
