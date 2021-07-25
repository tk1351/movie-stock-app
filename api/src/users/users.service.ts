import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, JwtPayload } from './types/types';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { IMessage } from '../defaultType';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  getAllUsers(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<IUser> {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new NotFoundException(`id: ${id}のuserは存在しません`);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IMessage> {
    return await this.usersRepository.createUser(createUserDto);
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.usersRepository.validateUserSub(
      authCredentialsDto,
    );

    if (!email) {
      throw new UnauthorizedException('認証情報が無効です');
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  // async deleteUser(id: number): Promise<boolean> {
  //   users = users.filter((user) => user.id !== id);
  //   return true;
  // }
}
