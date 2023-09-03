import { ApiProperty } from '@nestjs/swagger';
import { MESSAGES } from '@utils/constants';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogInUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: MESSAGES.EMAIL_NOT_VALID })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: MESSAGES.PASSWORD_REQUIRED })
  password: string;
}
