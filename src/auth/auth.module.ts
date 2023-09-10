import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { LoggerModule } from '@logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@users/user.module';
import { JWT_ACCESS_STRATEGY } from '@utils/constants';
import { JwtAccessStrategy } from '@auth/strategies/jwt-access.strategy';
import { EmailModule } from '@email/email.module';
import { JwtRefreshStrategy } from '@auth/strategies/jwt-refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  imports: [
    ConfigModule,
    EmailModule,
    LoggerModule,
    UserModule,
    PassportModule.register({ defaultStrategy: JWT_ACCESS_STRATEGY }),
    JwtModule.register({}),
  ],
  exports: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    PassportModule,
    JwtModule,
    AuthService,
    EmailModule,
  ],
})
export class AuthModule {}
