import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class DefaultEntity extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @CreateDateColumn()
  readonly updatedAt: Date;
}
