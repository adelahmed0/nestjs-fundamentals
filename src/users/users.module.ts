import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_NAME } from './users.constants';

abstract class ConfigService {}
class DevConfigService extends ConfigService {}
class ProdConfigService extends ConfigService {}

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_NAME,
      useValue: 'NestJS Fundamentals',
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevConfigService
          : ProdConfigService,
    },
  ],
})
export class UsersModule {}
