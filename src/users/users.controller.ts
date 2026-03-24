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
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  find(): string[] {
    return ['user1', 'user2', 'user3'];
  }

  @Get(':username')
  findOne(@Param('username') username: string): string {
    return `This action returns a ${username} user`;
  }

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto): string {
    // DTO => Data Transfer Object
    return `User created: ${createUserDto.name} ${createUserDto.email}`;
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() userData: any): string {
    return `User updated: ${username} ${JSON.stringify(userData)}`;
  }

  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('username') username: string): string {
    return `This action removes a ${username} user`;
  }
}
