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

@Injectable()
class DatabaseConnection {
  async connectToDB(): Promise<string> {
    return await Promise.resolve('connected');
  }
}

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserHabitsFactory,
    LoggerService,
    loggerAliasProvider,
    DatabaseConnection,
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
      useFactory: async (
        userHabitsFactory: UserHabitsFactory,
        db: DatabaseConnection,
      ) => {
        {
          await db.connectToDB();
          return userHabitsFactory.get();
        }
      },
      inject: [UserHabitsFactory, DatabaseConnection],
    },
  ],
})
export class UsersModule {}
