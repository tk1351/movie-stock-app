import { InputType, Field } from '@nestjs/graphql';

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
}
