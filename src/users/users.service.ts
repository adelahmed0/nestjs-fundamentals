import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  findUsers(): UserEntity[] {
    return this.users;
  }

  findUserById(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Resource Not Found',
        errors: {
          id: `User with id ${id} not found`,
        },
      });
    }
    return user;
  }

  createUser(createUserDto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      id: uuid(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): UserEntity {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = {
      ...this.users[index],
      ...updateUserDto,
    };
    return this.users[index];
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
