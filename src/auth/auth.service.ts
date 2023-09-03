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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  private generateToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
