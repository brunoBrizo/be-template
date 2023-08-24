import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '@config/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@interceptors/transform.interceptor';
import { validationPipeOptions } from '@config/validation-pipe.config';
import helmet from 'helmet';
import { ResponseTimeInterceptor } from '@interceptors/response_time.interceptor';

async function bootstrap() {
  const logger = new Logger('Main app');

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.use(helmet());

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ResponseTimeInterceptor());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);

  const port = process.env.PORT;
  await app.listen(port);

  logger.log(`App running on port ${port}`);
}
bootstrap();
