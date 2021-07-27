import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCrewsDto } from '../../crews/dto/create-crews.dto';
import { CreateTagsDto } from '../../tags/dto/create-tags-dto';

@InputType()
export class CreateMovieDto {
  @Field()
  @IsNotEmpty({ message: 'titleを入力してください' })
  @IsString({ message: 'titleは文字で入力してください' })
  title: string;

  @Field()
  @IsNotEmpty({ message: 'releaseを入力してください' })
  @IsString({ message: 'releaseは文字で入力してください' })
  release: string;

  @Field()
  @IsNotEmpty({ message: 'timeを入力してください' })
  @IsString({ message: 'timeは文字で入力してください' })
  time: string;

  @Field()
  @IsNotEmpty({ message: 'originCountryを入力してください' })
  @IsString({ message: 'originCountryは文字で入力してください' })
  originCountry: string;

  @Field()
  @IsNotEmpty({ message: 'productionCompanyを入力してください' })
  @IsString({ message: 'productionCompanyは文字で入力してください' })
  productionCompany: string;

  @Field(() => [CreateCrewsDto])
  @IsNotEmpty({ message: 'crewsを入力してください' })
  crews: CreateCrewsDto[];

  @Field(() => [CreateTagsDto])
  @IsNotEmpty({ message: 'tagsを入力してください' })
  tags: CreateTagsDto[];
}
