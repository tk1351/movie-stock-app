import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AuthCredentialsDto {
  @Field()
  email: string;

  @Field()
  sub: string;
}
