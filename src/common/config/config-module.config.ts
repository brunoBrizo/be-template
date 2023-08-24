import { ConfigModuleOptions } from '@nestjs/config';
import { configValidationSchema } from '@config/config.schema';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath: [`.env.${process.env.STAGE}`],
  validationSchema: configValidationSchema,
  isGlobal: true,
};
