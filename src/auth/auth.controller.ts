import { AuthService } from '@auth/auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogInUserDto } from '@auth/dto/login-user.dto';
import { LoginResponse } from '@auth/models/login-response';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { RefreshTokenDocDecorator } from '@auth/decorators/refresh-token.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JWT_DEFAULT_STRATEGY } from '@utils/constants';
import { GetUser } from '@auth/decorators/get-user.decorator';
import { LogInUserDecorator } from '@auth/decorators/login.decorator';
import { SignUpUserDecorator } from '@auth/decorators/signup.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @LogInUserDecorator()
  logIn(@Body() logInUserDto: LogInUserDto): Promise<LoginResponse> {
    return this.authService.logIn(logInUserDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  @SignUpUserDecorator()
  signUp(@Body() createEmployeeDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.signUpUser(createEmployeeDto);
  }

  @HttpCode(HttpStatus.OK)
  @RefreshTokenDocDecorator()
  @Post('/refresh')
  @UseGuards(AuthGuard(JWT_DEFAULT_STRATEGY))
  refresh(@GetUser() user): Promise<LoginResponse> {
    return this.authService.updateTokens(user);
  }
}
