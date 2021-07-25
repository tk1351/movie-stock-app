import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Unique, Column } from 'typeorm';
import { DefaultEntity } from '../entity';

@Entity({ name: 'users' })
@Unique(['email'])
@ObjectType()
export class User extends DefaultEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  sub: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  role: string;
}
