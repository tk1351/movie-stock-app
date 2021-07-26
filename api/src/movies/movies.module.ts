import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MoviesRepository])],
  providers: [MoviesService, MoviesResolver],
})
export class MoviesModule {}
