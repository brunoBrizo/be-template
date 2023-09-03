import { CreateUserDto } from '@users/dtos/create-user.dto';
import { LoginResponse } from '@auth/models/login-response';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInUserDto } from '@auth/dto/login-user.dto';
import { UserService } from '@users/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, hashUserPassword } from '@utils/password.helper';
import { MESSAGES } from '@utils/constants';
import { JwtPayload } from '@auth/models/jwt-payload.interface';

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

    const token = await this.generateToken({ userId: user.id });

    const response: LoginResponse = {
      accessToken: token,
      user,
    };

    return response;
  }

  async signUpUser(createUserDto: CreateUserDto): Promise<LoginResponse> {
    createUserDto.password = await hashUserPassword(createUserDto.password);

    const user = await this.userService.createUser(createUserDto);

    const token = await this.generateToken({ userId: user.id });

    const response: LoginResponse = {
      accessToken: token,
      user,
    };

    return response;
  }

  private async generateToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
