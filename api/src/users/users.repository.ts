import { EntityRepository, Repository } from 'typeorm';
import { User } from './user';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { IMessage } from '../defaultType';
import { CreateUserDto } from './dto/create-user.dto';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<IMessage> {
    const { name, sub, email, picture } = createUserDto;

    const user = this.create();
    user.name = name;
    user.sub = sub;
    user.email = email;
    user.picture = picture;
    user.role = 'user';

    try {
      await user.save();
      return { message: 'ユーザー登録が完了しました' };
    } catch (e) {
      if (e.code === '23505')
        throw new ConflictException('このメールアドレスは既に登録されています');
      throw new InternalServerErrorException();
    }
  }

  async validateUserSub(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { email, sub } = authCredentialsDto;

    const user = await this.createQueryBuilder('users')
      .where('users.email = :email', { email })
      .andWhere('users.sub = :sub', { sub })
      .getOne();

    if (user) {
      return user.email;
    } else {
      return null;
    }
  }
}
