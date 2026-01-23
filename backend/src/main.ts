import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,BadRequestException } from '@nestjs/common';
import { error } from 'console';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors)=>{
        const messages = errors.map(error=>({
          field: error.property,
          errors: Object.values(error.constraints || {})
        }));
        return new BadRequestException({
          statusCode:400,
          message: "Validation failed",
          errors:messages
        });
      }
    })
  );

  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });
  
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
