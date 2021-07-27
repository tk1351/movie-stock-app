import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './models/tag';
import { CreateTagsDto } from './dto/create-tags-dto';
import { IMessage } from '../defaultType';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  async createTag(createTagsDto: CreateTagsDto): Promise<Tag> {
    const { text, movieId } = createTagsDto;

    const tag = this.create();
    tag.text = text;
    tag.movieId = movieId;

    try {
      await tag.save();
      return tag;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getTagsByMovieId(movieId: number): Promise<Tag[]> {
    const found = await this.createQueryBuilder('tags')
      .where('tags.movieId = :movieId', { movieId })
      .getMany();

    return found;
  }

  async deleteTag(id: number): Promise<IMessage> {
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`ID: ${id}のtagは存在しません`);

    return { message: 'tagを削除しました' };
  }

  async deleteTagsByMovieId(movieId: number): Promise<IMessage> {
    const targetTags = await this.getTagsByMovieId(movieId);

    if (targetTags.length > 0) {
      targetTags.map(
        async (targetTag) => await this.delete({ id: targetTag.id }),
      );
    }

    return { message: 'tagを削除しました' };
  }
}
