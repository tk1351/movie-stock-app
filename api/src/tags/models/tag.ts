import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DefaultEntity } from '../../entity';
import { Movie } from '../../movies/models/movie';

@Entity({ name: 'tags' })
@ObjectType()
export class Tag extends DefaultEntity {
  @Field()
  @Column()
  text: string;

  @Field(() => Movie)
  @ManyToOne(() => Movie, (movie) => movie.tags, { eager: false })
  @JoinColumn({ name: 'movieId', referencedColumnName: 'id' })
  movie: Movie;

  @Field()
  @Column()
  movieId: number;
}
