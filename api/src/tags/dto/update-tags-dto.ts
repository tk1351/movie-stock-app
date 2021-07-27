import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateTagsDto {
  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'textを入力してください' })
  @IsString({ message: 'textは文字で入力してください' })
  text: string;

  @Field(() => Int)
  movieId: number;
}
