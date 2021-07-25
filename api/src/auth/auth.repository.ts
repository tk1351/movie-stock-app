import { EntityRepository, Repository } from 'typeorm';
import { User } from '../users/models/user';
import { IUser } from '../users/types/types';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async getAuthUser(user: User): Promise<IUser> {
    const found = await this.findOne({ id: user.id });

    return found;
  }
}
