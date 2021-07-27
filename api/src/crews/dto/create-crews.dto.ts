import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

@InputType()
export class CreateCrewsDto {
  @Field()
  @IsNotEmpty({ message: 'categoryを入力してください' })
  @IsInt({ message: 'categoryは数字で入力してください' })
  category: number;

  @Field()
  @IsNotEmpty({ message: 'nameを入力してください' })
  @IsString({ message: 'nameは文字で入力してください' })
  name: string;

  @Field(() => Int, { nullable: true })
  movieId?: number | undefined;
}
