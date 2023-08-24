import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@config/typeorm-datasource.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        const sslOptions = {
          ssl: isProduction,
          extra: { ssl: isProduction ? { rejectUnauthorized: false } : null },
        };

        return {
          ...sslOptions,
          ...dataSourceOptions,
          autoLoadEntities: false,
          migrations: ['dist/migrations/*.js'],
          migrationsRun:
            configService.get('DB_MIGRATIONS_RUN') === 'true' ? true : false,
          synchronize:
            configService.get('DB_SYNCHRONIZE') === 'true' ? true : false,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
