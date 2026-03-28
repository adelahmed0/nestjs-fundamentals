import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
