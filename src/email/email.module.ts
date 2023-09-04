import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from '@email/email.service';
import { ENV_VARS } from '@utils/constants';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get(ENV_VARS.EMAIL_SERVICE),
          auth: {
            user: configService.get(ENV_VARS.EMAIL_USER),
            pass: configService.get(ENV_VARS.EMAIL_PASSWORD),
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
