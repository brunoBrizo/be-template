import { AuthService } from '@auth/auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogInUserDto } from '@auth/dto/login-user.dto';
import { LoginResponse } from '@auth/models/login-response';
import { CreateUserDto } from '@users/dtos/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  logIn(@Body() logInUserDto: LogInUserDto): Promise<LoginResponse> {
    return this.authService.logIn(logInUserDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  signUp(@Body() createEmployeeDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.signUpUser(createEmployeeDto);
  }
}
