import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { CrewsModule } from './crews/crews.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    CrewsModule,
    TagsModule,
  ],
})
export class AppModule {}
