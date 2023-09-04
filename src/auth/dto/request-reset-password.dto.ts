import { ApiProperty } from '@nestjs/swagger';
import { MESSAGES } from '@utils/constants';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: MESSAGES.EMAIL_NOT_VALID })
  email: string;
}
