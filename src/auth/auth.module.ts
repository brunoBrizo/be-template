import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { LoggerModule } from '@logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@users/user.module';
import { ENV_VARS, JWT_DEFAULT_STRATEGY } from '@utils/constants';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    LoggerModule,
    UserModule,
    PassportModule.register({ defaultStrategy: JWT_DEFAULT_STRATEGY }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>(ENV_VARS.JWT_SECRET),
          signOptions: {
            expiresIn: configService.get<string>(ENV_VARS.JWT_EXPIRES_IN),
          },
        };
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
