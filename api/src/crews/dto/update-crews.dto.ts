import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCrewsDto {
  @Field()
  category: number;

  @Field()
  name: string;

  @Field(() => Int)
  movieId: number;
}
