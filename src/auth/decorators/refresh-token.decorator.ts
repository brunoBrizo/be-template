import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { MESSAGES } from '@utils/constants';
import { LoginResponse } from '@auth/models/login-response';

export const RefreshTokenDocDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh a JWT token',
      description: `This endpoint will be in charge of refreshing a JWT token used for authentication`,
    }),
    ApiOkResponse({
      description: MESSAGES.REFRESH_OK,
      type: LoginResponse,
      status: HttpStatus.OK,
    }),
    ApiUnauthorizedResponse({ description: MESSAGES.UNAUTHORIZED }),
  );
};
