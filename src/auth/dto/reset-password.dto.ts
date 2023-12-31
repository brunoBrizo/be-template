import { ApiProperty } from '@nestjs/swagger';
import { MESSAGES, PASSWORD_MAX_LENGTH } from '@utils/constants';
import { strongPasswordOptions } from '@utils/password.helper';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty()
  @IsNotEmpty({ message: MESSAGES.PASSWORD_REQUIRED })
  @MaxLength(PASSWORD_MAX_LENGTH)
  @IsStrongPassword(strongPasswordOptions, {
    message: MESSAGES.PASSWORD_VALIDATION_ERROR,
  })
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}
