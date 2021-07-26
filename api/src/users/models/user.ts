import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Unique, Column, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movie';

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

  @Field(() => [Movie])
  @OneToMany(() => Movie, (movies) => movies.user, { eager: true })
  movies: Movie[];
}
