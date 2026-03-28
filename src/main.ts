import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
      exceptionFactory: (validationErrors) => {
        const errors = {};
        validationErrors.forEach((err) => {
          errors[err.property] = Object.values(err.constraints ?? {})[0];
        });
        return new BadRequestException({
          statusCode: 400,
          message: 'Validation Failed',
          errors: errors,
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
