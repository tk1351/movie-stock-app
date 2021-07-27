import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DefaultEntity } from '../../entity';
import { User } from '../../users/models/user';
import { Crew } from '../../crews/models/crew';
import { Tag } from '../../tags/models/tag';

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

  @Field(() => [Crew])
  @OneToMany(() => Crew, (crews) => crews.movie, { eager: true })
  crews: Crew[];

  @Field(() => [Tag])
  @OneToMany(() => Tag, (tags) => tags.movie, { eager: true })
  tags: Tag[];
}
