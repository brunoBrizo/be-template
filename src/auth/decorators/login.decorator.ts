import { LogInUserDto } from '@auth/dto/login-user.dto';
import { LoginResponse } from '@auth/models/login-response';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MESSAGES } from '@utils/constants';

export const LogInUserDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Log in a user',
      description: `This endpoint will be in charge of logging in a user and returning a JWT 
                    token that will be used for later authentication`,
    }),
    ApiBody({ type: LogInUserDto }),
    ApiOkResponse({
      description: MESSAGES.LOGIN_OK,
      type: LoginResponse,
      status: HttpStatus.OK,
    }),
    ApiUnauthorizedResponse({ description: MESSAGES.UNAUTHORIZED }),
  );
};
