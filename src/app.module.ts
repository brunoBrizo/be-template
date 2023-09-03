import { AuthModule } from '@auth/auth.module';
import { configModuleOptions } from '@config/config-module.config';
import { DatabaseModule } from '@database/database.module';
import { CustomExceptionFilter } from '@filters/custom-exception.filter';
import { LoggerModule } from '@logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from '@users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    DatabaseModule,
    LoggerModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
