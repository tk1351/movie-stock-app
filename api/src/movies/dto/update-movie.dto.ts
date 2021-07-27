import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { UpdateCrewsDto } from '../../crews/dto/update-crews.dto';
import { UpdateTagsDto } from '../../tags/dto/update-tags-dto';

@InputType()
export class UpdateMovieDto {
  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'titleを入力してください' })
  @IsString({ message: 'titleは文字で入力してください' })
  title: string;

  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'releaseを入力してください' })
  @IsString({ message: 'releaseは文字で入力してください' })
  release: string;

  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'timeを入力してください' })
  @IsString({ message: 'timeは文字で入力してください' })
  time: string;

  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'originCountryを入力してください' })
  @IsString({ message: 'originCountryは文字で入力してください' })
  originCountry: string;

  @Field()
  @IsOptional()
  @IsNotEmpty({ message: 'productionCompanyを入力してください' })
  @IsString({ message: 'productionCompanyは文字で入力してください' })
  productionCompany: string;

  @Field(() => [UpdateCrewsDto])
  @IsOptional()
  @IsNotEmpty({ message: 'crewsを入力してください' })
  crews: UpdateCrewsDto[];

  @Field(() => [UpdateTagsDto])
  @IsOptional()
  @IsNotEmpty({ message: 'tagsを入力してください' })
  tags: UpdateTagsDto[];
}
