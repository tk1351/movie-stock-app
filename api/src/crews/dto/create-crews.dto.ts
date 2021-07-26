import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCrewsDto {
  @Field()
  category: number;

  @Field()
  name: string;

  @Field(() => Int, { nullable: true })
  movieId?: number | undefined;
}
