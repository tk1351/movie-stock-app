import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTagsDto {
  @Field()
  text: string;

  @Field(() => Int, { nullable: true })
  movieId?: number | undefined;
}
