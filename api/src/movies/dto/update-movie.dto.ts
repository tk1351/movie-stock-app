import { InputType, Field } from '@nestjs/graphql';
import { UpdateCrewsDto } from '../../crews/dto/update-crews.dto';
import { UpdateTagsDto } from '../../tags/dto/update-tags-dto';

@InputType()
export class UpdateMovieDto {
  @Field()
  title: string;

  @Field()
  release: string;

  @Field()
  time: string;

  @Field()
  originCountry: string;

  @Field()
  productionCompany: string;

  @Field(() => [UpdateCrewsDto])
  crews: UpdateCrewsDto[];

  @Field(() => [UpdateTagsDto])
  tags: UpdateTagsDto[];
}
