import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

@Controller('users')
export class UsersController {
  private users: UserEntity[] = [];

  @Get()
  find(): UserEntity[] {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserEntity | undefined {
    return this.users.find((user) => user.id === id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      id: uuid(),
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserEntity {
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): undefined {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
