import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EMAIL_MESSAGES, ENV_VARS } from '@utils/constants';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendResetPasswordEmail(
    email: string,
    resetPasswordToken: string,
  ): Promise<void> {
    const webAppUrl = this.configService.get<string>(ENV_VARS.WEB_APP_URL);
    const link = `${webAppUrl}/auth/password-reset?token=${resetPasswordToken}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        from: `PsicoAdmin Notifications <${this.configService.get(
          ENV_VARS.EMAIL_FROM,
        )}>`,
        subject: EMAIL_MESSAGES.PASSWORD_RESET_SUBJECT,
        html: this.loadResetPasswordHtml(link),
        headers: {
          'X-PM-Tag': 'user_password_reset',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendUserCreatedEmail(
    email: string,
    name: string,
    link: string,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: `PsicoAdmin Notifications <${this.configService.get(
          ENV_VARS.EMAIL_FROM,
        )}>`,
        subject: EMAIL_MESSAGES.ACCOUNT_CREATED_SUBJECT,
        html: this.loadNewClientHtml(name, link),
        headers: {
          'X-PM-Tag': 'user_password_reset',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private loadResetPasswordHtml(link: string) {
    const html = link;

    return html;
  }

  private loadNewClientHtml(email: string, link: string) {
    const HTML = email + link;

    return HTML;
  }
}
