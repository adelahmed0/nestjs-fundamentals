import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    // console.log(process.env.DB_HOST);
    // console.log(process.env.NODE_ENV);
    console.log(this.configService.get<string>('DB_HOST'));
    console.log(this.configService.get<string>('NODE_ENV'));
  }

  @Public()
  @Get()
  find(): UserEntity[] {
    return this.userService.findUsers();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity | undefined {
    return this.userService.findUserById(id);
  }
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserEntity {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): undefined {
    this.userService.deleteUser(id);
  }
}
