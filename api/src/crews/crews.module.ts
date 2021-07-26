import { Module } from '@nestjs/common';
import { CrewsService } from './crews.service';
import { CrewsResolver } from './crews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrewsRepository } from './crews.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CrewsRepository])],
  providers: [CrewsService, CrewsResolver],
})
export class CrewsModule {}
