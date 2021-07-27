import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { UsersModule } from '../users/users.module';
import { CrewsModule } from '../crews/crews.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoviesRepository]),
    UsersModule,
    CrewsModule,
    TagsModule,
  ],
  providers: [MoviesService, MoviesResolver],
})
export class MoviesModule {}
