import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_NAME, USER_HABITS } from './users.constants';

abstract class ConfigService {}
class DevConfigService extends ConfigService {}
class ProdConfigService extends ConfigService {}

@Injectable()
class UserHabitsFactory {
  get() {
    return ['eat', 'sleep', 'code'];
  }
}

@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerAliasProvider = {
  provide: 'AliasedLoggerService',
  useExisting: LoggerService,
};

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserHabitsFactory,
    LoggerService,
    loggerAliasProvider,
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
    {
      provide: USER_HABITS,
      useFactory: (userHabitsFactory: UserHabitsFactory) => {
        return userHabitsFactory.get();
      },
      inject: [UserHabitsFactory],
    },
  ],
})
export class UsersModule {}
