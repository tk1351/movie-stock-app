import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTagsDto {
  @Field()
  @IsNotEmpty({ message: 'textを入力してください' })
  @IsString({ message: 'textは文字で入力してください' })
  text: string;

  @Field(() => Int, { nullable: true })
  movieId?: number | undefined;
}
