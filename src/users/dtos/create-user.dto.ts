import { Type } from 'class-transformer';
import {
  IsEmail,
  IsString,
  MaxLength,
  IsStrongPassword,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MESSAGES, PASSWORD_MAX_LENGTH } from '@utils/constants';
import { strongPasswordOptions } from '@utils/password.helper';
import { IsValidDate } from '@users/validators/isValidDate.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: MESSAGES.EMAIL_NOT_VALID })
  email?: string;

  @ApiProperty()
  @IsNotEmpty({ message: MESSAGES.PASSWORD_REQUIRED })
  @MaxLength(PASSWORD_MAX_LENGTH)
  @IsStrongPassword(strongPasswordOptions, {
    message: MESSAGES.PASSWORD_VALIDATION_ERROR,
  })
  password?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: MESSAGES.FIRST_NAME_REQUIRED })
  name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: MESSAGES.LAST_NAME_REQUIRED })
  lastName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: MESSAGES.ID_REQUIRED })
  idDocument?: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsValidDate()
  @IsNotEmpty({ message: MESSAGES.DATE_OF_BIRTH_REQUIRED })
  dateOfBirth?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: MESSAGES.ADDRESS_REQUIRED })
  streetAddress1?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  streetAddress2?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: MESSAGES.CITY_REQUIRED })
  city?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: MESSAGES.PHONE_NUMBER_REQUIRED })
  phoneNumber?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: MESSAGES.COUNTRY_REQUIRED })
  countryCode?: string;
}
