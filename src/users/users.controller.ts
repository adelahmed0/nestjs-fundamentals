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
  private readonly users: UserEntity[] = [];

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

  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return `User updated: ${username} ${JSON.stringify(updateUserDto)}`;
  }

  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('username') username: string): string {
    return `This action removes a ${username} user`;
  }
}
