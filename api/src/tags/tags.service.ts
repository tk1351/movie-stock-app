import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';
import { Tag } from './models/tag';
import { IMessage } from '../defaultType';
import { CreateTagsDto } from './dto/create-tags-dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private tagsRepository: TagsRepository,
  ) {}

  async getAllTags(): Promise<Tag[]> {
    return await this.tagsRepository.find();
  }

  async createTags(createTagsDtos: CreateTagsDto[]): Promise<Tag[]> {
    const newTags = Promise.all(
      createTagsDtos.map(async (createTagsDto) => {
        const newTag = await this.tagsRepository.createTag(createTagsDto);
        return newTag;
      }),
    );
    return newTags;
  }

  async deleteTagsByMovieId(movieId: number): Promise<IMessage> {
    return await this.tagsRepository.deleteTagsByMovieId(movieId);
  }
}
