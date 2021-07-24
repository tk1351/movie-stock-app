import { Injectable } from '@nestjs/common';
import { User } from './user';
import { CreateUserDto } from './dto/create-user.dto';

let users: User[] = [
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

  getUserById(id: number): Promise<User> {
    const user = users.find((user) => user.id === id);
    return Promise.resolve(user);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = {
      ...createUserDto,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);

    return Promise.resolve(newUser);
  }

  async deleteUser(id: number): Promise<boolean> {
    users = users.filter((user) => user.id !== id);
    return true;
  }
}
