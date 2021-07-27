import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdateCrewsDto {
  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'categoryを入力してください' })
  @IsInt({ message: 'categoryは数字で入力してください' })
  category: number;

  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'nameを入力してください' })
  @IsString({ message: 'nameは文字で入力してください' })
  name: string;

  @Field(() => Int)
  movieId: number;
}
