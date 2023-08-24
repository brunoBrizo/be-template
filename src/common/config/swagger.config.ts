import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('PsicoAdmin API')
  .setDescription('PsicoAdmin API Documentation')
  .setVersion('1.0')
  .addBearerAuth({
    description: 'JWT Token format: Bearer <JWT>',
    type: 'http',
    in: 'Header',
    scheme: 'Bearer',
    bearerFormat: 'Bearer',
    name: 'Authorization',
  })
  .build();
