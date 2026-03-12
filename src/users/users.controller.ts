import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  find(): string[] {
    return ['user1', 'user2', 'user3'];
  }

  @Get(':id')
  findOne(): string {
    return `This action returns a one user`;
  }

  @Post()
  create(): string {
    return 'This action adds a new user';
  }

  @Delete(':id')
  remove(): string {
    return 'This action removes a #id user';
  }

  @Patch(':id')
  update(): string {
    return 'This action updates a #id user';
  }
}
