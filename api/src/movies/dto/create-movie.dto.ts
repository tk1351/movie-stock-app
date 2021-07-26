import { InputType, Field } from '@nestjs/graphql';
import { CreateCrewsDto } from '../../crews/dto/create-crews.dto';

@InputType()
export class CreateMovieDto {
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

  @Field(() => [CreateCrewsDto])
  crews: CreateCrewsDto[];
}
