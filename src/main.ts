import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { WrapDataInterceptor } from './common/interceptors/wrap-data.interceptor';
import { CustomExceptionFilter } from './common/filters/custom-exception.filter';
// import { AuthGuard } from './common/guards/auth.guard';
// import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors) => {
        const errors = {};
        validationErrors.forEach((err) => {
          errors[err.property] = Object.values(err.constraints ?? {})[0];
        });
        // نبعت بس الـ message والـ errors
        return new BadRequestException({
          message: 'Validation Failed',
          errors: errors,
        });
      },
    }),
  );
  app.useGlobalInterceptors(
    new WrapDataInterceptor(),
    // new TimeoutInterceptor(),
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  // app.useGlobalGuards(new AuthGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
