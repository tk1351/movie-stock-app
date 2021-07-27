import { Resolver, Query } from '@nestjs/graphql';
import { Tag } from './models/tag';
import { TagsService } from './tags.service';

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private tagsService: TagsService) {}

  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    return await this.tagsService.getAllTags();
  }
}
