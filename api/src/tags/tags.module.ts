import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { TagsRepository } from './tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagsRepository])],
  providers: [TagsService, TagsResolver],
  exports: [TagsService],
})
export class TagsModule {}
