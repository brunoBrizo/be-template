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
import { JWT_ACCESS_STRATEGY, JWT_REFRESH_STRATEGY } from '@utils/constants';
import { GetUser } from '@auth/decorators/get-user.decorator';
import { LogInUserDecorator } from '@auth/decorators/login.decorator';
import { SignUpUserDecorator } from '@auth/decorators/signup.decorator';
import { LogOutDocDecorator } from '@auth/dto/logout-user.decorator';
import { User } from '@users/models/user.entity';
import { ResetPasswordRequestDto } from '@auth/dto/request-reset-password.dto';
import { ResetPasswordRequestDecorator } from '@auth/decorators/reset-password-request.decorator';
import { ResetPasswordDecorator } from '@auth/decorators/reset-password.decorator';
import { ResetPasswordDTO } from '@auth/dto/reset-password.dto';

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
  signUp(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.signUpUser(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @RefreshTokenDocDecorator()
  @Post('/refresh')
  @UseGuards(AuthGuard(JWT_REFRESH_STRATEGY))
  refresh(@GetUser() user: User): Promise<LoginResponse> {
    return this.authService.updateTokens(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  @UseGuards(AuthGuard(JWT_ACCESS_STRATEGY))
  @LogOutDocDecorator()
  logout(@GetUser() user: User): Promise<void> {
    return this.authService.logout(user);
  }

  @ResetPasswordRequestDecorator()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('password/reset-request')
  resetPasswordRequest(
    @Body() resetPasswordRequestDto: ResetPasswordRequestDto,
  ): Promise<void> {
    return this.authService.resetPasswordRequest(resetPasswordRequestDto);
  }

  @ResetPasswordDecorator()
  @Post('password/reset')
  @HttpCode(HttpStatus.NO_CONTENT)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDTO): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
