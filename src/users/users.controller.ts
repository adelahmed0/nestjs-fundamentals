import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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
  create(@Body() userData: any): string {
    console.log(userData);
    return 'This action adds a new user';
  }

  @Delete(':username')
  remove(@Param('username') username: string): string {
    return `This action removes a ${username} user`;
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() userData: any): string {
    console.log(userData);
    return `This action updates a ${username} user`;
  }
}
