import {
  BadRequestException,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';

export const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    const message = [];
    validationErrors.forEach((error) => {
      const constraints = Object.values(error.constraints);
      message.push(...constraints);
    });

    return new BadRequestException(message);
  },
};
