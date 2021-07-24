import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  sub: string;

  @Field()
  email: string;

  @Field()
  picture: string;

  @Field()
  role: string;
}
