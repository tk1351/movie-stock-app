import { Injectable } from '@nestjs/common';
import { User } from './user';

const users: User[] = [
  {
    id: 1,
    sub: '1',
    email: 'test1@example.com',
    picture: 'test1',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    sub: '2',
    email: 'test2@example.com',
    picture: 'test2',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Injectable()
export class UsersService {
  getAllUsers(): Promise<User[]> {
    return Promise.resolve(users);
  }
}
