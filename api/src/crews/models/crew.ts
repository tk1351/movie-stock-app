import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movie';

@Entity({ name: 'crews' })
@ObjectType()
export class Crew extends DefaultEntity {
  @Field()
  @Column()
  category: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Movie)
  @ManyToOne(() => Movie, (movie) => movie.crews, { eager: false })
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: Movie;

  @Field()
  @Column()
  movieId: number;
}
