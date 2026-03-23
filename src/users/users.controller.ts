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
  create(@Body() userData: any): string {
    console.log(userData);
    return `User created: ${JSON.stringify(userData)}`;
  }

  @Patch(':username')
  update(@Param('username') username: string, @Body() userData: any): string {
    console.log(userData);
    return `User updated: ${username} ${JSON.stringify(userData)}`;
  }

  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('username') username: string): string {
    return `This action removes a ${username} user`;
  }
}
