import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string[] {
    return ['user1', 'user2', 'user3'];
  }

  @Post()
  create(): string {
    return 'This action adds a new user';
  }
}
