import { ResetPasswordDTO } from '@auth/dto/reset-password.dto';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { LoginResponse } from '@auth/models/login-response';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LogInUserDto } from '@auth/dto/login-user.dto';
import { UserService } from '@users/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashUserPassword } from '@utils/password.helper';
import { ENV_VARS, JWT_TOKEN_EXPIRED_ERROR, MESSAGES } from '@utils/constants';
import { JwtPayload } from '@auth/models/jwt-payload.interface';
import { User } from '@users/models/user.entity';
import { ResetPasswordRequestDto } from '@auth/dto/request-reset-password.dto';
import { EmailService } from '@email/email.service';
import { LoggerService } from '@logger/logger.service';
import { TokenType } from '@auth/models/token-type.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private emailService: EmailService,
    private loggerService: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  async logIn(logInUserDto: LogInUserDto): Promise<LoginResponse> {
    const { email, password } = logInUserDto;
    let authenticated = false;

    const user = await this.userService.getUserByEmail(email);
    if (user) {
      const validPassword = await comparePassword(password, user.password);

      if (validPassword) {
        authenticated = true;
      }
    }

    if (!authenticated) {
      throw new UnauthorizedException(MESSAGES.INVALID_EMAIL_OR_PASSWORD);
    }

    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    await this.updateUserRefreshToken(user, refreshToken);

    const response: LoginResponse = {
      accessToken,
      refreshToken,
      user,
    };

    return response;
  }

  async signUpUser(createUserDto: CreateUserDto): Promise<LoginResponse> {
    createUserDto.password = await hashUserPassword(createUserDto.password);

    const user = await this.userService.createUser(createUserDto);
    return this.updateTokens(user);
  }

  async updateTokens(user: User): Promise<LoginResponse> {
    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(user.id);

    await this.updateUserRefreshToken(user, newRefreshToken);

    const response: LoginResponse = {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    };

    return response;
  }

  async logout(user: User): Promise<void> {
    await this.userService.updateRefreshToken(user, null);
  }

  async resetPasswordRequest(
    resetPasswordRequestDto: ResetPasswordRequestDto,
  ): Promise<void> {
    const { email } = resetPasswordRequestDto;
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      const resetPasswordToken = await this.generateToken(TokenType.EMAIL, {
        userId: user.id,
        email: user.email,
      });

      user.resetPasswordToken = resetPasswordToken;
      await this.userService.updateUser(user);

      await this.emailService.sendResetPasswordEmail(email, resetPasswordToken);
      this.loggerService.log(`User ${email} requested password reset`);
    } else {
      this.loggerService.warn(
        `A user's password reset was requested but email was not found. Email: ${email}`,
      );
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDTO): Promise<void> {
    const { password, token } = resetPasswordDto;

    const userId = await this.decodeResetPasswordToken(token);

    const user = await this.userService.resetUserPassword(
      userId,
      password,
      token,
    );

    this.loggerService.log(`User ${user.email} has completed a password reset`);
  }

  private async generateToken(
    tokenType: TokenType,
    payload: JwtPayload,
  ): Promise<string> {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(
        `JWT_${tokenType.toUpperCase()}_TOKEN_SECRET`,
      ),
      expiresIn: this.configService.get<string>(
        `JWT_${tokenType.toUpperCase()}_TOKEN_EXPIRATION_TIME`,
      ),
    });

    return token;
  }

  private async generateTokens(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      userId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      await this.generateToken(TokenType.ACCESS, payload),
      await this.generateToken(TokenType.REFRESH, payload),
    ]);

    return { accessToken, refreshToken };
  }

  private updateUserRefreshToken(
    user: User,
    refreshToken: string,
  ): Promise<User> {
    return this.userService.updateRefreshToken(user, refreshToken);
  }

  private async decodeResetPasswordToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>(ENV_VARS.JWT_EMAIL_TOKEN_SECRET),
      });

      const userId = payload?.userId;
      if (!userId) {
        throw new BadRequestException(MESSAGES.INVALID_TOKEN);
      }

      return userId;
    } catch (error) {
      if (error.name === JWT_TOKEN_EXPIRED_ERROR) {
        throw new BadRequestException(MESSAGES.TOKEN_EXPIRED);
      } else {
        throw new BadRequestException(MESSAGES.INVALID_TOKEN);
      }
    }
  }
}
