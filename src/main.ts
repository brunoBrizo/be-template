import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '@config/swagger.config';
import { Logger } from '@nestjs/common';

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
  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;
  await app.listen(port);

  logger.log(`App running on port ${port}`);
}
bootstrap();
