import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
