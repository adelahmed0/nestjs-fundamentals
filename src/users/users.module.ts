import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_NAME } from './users.constants';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_NAME,
      useValue: 'NestJS Fundamentals',
    },
  ],
})
export class UsersModule {}
