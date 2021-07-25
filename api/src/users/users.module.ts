import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './user';
import { UsersRepository } from './users.repository';
import { jwtConstants } from '../config/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [UsersResolver, UsersService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
