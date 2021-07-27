import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTagsDto {
  @Field()
  text: string;

  @Field(() => Int)
  movieId: number;
}
