import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/models/user';
import { AuthRepository } from './auth.repository';
import { IUser } from '../users/types/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}

  whoAmI(user: User): Promise<IUser> {
    return this.authRepository.getAuthUser(user);
  }
}
