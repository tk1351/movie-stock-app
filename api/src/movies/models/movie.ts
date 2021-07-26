import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DefaultEntity } from '../../entity';
import { User } from '../../users/models/user';

@Entity({ name: 'movies' })
@ObjectType()
export class Movie extends DefaultEntity {
  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  release: string;

  @Field()
  @Column()
  time: string;

  @Field()
  @Column()
  originCountry: string;

  @Field()
  @Column()
  productionCompany: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.movies, { eager: false })
  user: User;
}
