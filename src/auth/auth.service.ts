import { CreateUserDto } from '@users/dtos/create-user.dto';
import { LoginResponse } from '@auth/models/login-response';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInUserDto } from '@auth/dto/login-user.dto';
import { UserService } from '@users/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashUserPassword } from '@utils/password.helper';
import { MESSAGES } from '@utils/constants';
import { JwtPayload } from '@auth/models/jwt-payload.interface';
import { User } from '@users/models/user.entity';
import { ResetPasswordRequestDto } from '@auth/dto/request-reset-password.dto';
import { EmailService } from '@email/email.service';
import { LoggerService } from '@logger/logger.service';
import { ResetPasswordDTO } from '@auth/dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private emailService: EmailService,
    private loggerService: LoggerService,
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

    const accessToken = this.generateToken({ userId: user.id });

    const response: LoginResponse = {
      accessToken,
      refreshToken: user.refreshToken,
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
    const accessToken = this.generateToken({ userId: user.id });
    const refreshToken = this.generateToken({ userId: user.id });

    await this.userService.updateRefreshToken(user, refreshToken);

    const response: LoginResponse = {
      accessToken,
      refreshToken,
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
      const resetPasswordToken = this.generateToken({ userId: user.id });

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

  // TODO: Implement this
  // async resetPassword(resetPasswordDto: ResetPasswordDTO): Promise<void> {}

  private generateToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
