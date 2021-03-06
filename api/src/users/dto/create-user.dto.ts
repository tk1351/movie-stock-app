import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  sub: string;

  @Field()
  email: string;

  @Field()
  picture: string;
}
