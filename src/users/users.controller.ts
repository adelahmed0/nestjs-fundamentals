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

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a ${id} user`;
  }

  @Post()
  create(@Body() userData: any): string {
    console.log(userData);
    return 'This action adds a new user';
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a ${id} user`;
  }

  @Patch(':id')
  update(@Param('id') id: string): string {
    return `This action updates a ${id} user`;
  }
}
