import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { error } from 'console';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   const config = new DocumentBuilder()
    .setTitle('Apis de Usuarios y Autenticación')
    .setDescription('API para la gestión de usuarios y autenticación utilizando NestJS')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

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
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Cookie',
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');

 

  await app.listen(process.env.PORT ?? 4000,'0.0.0.0');


  
}
bootstrap();
