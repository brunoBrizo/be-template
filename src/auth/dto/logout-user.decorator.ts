import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MESSAGES } from '@utils/constants';

export const LogOutDocDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Log out a user',
      description: `This endpoint will be in charge of logging out a user and deleting the refresh token`,
    }),
    ApiOkResponse({
      status: HttpStatus.NO_CONTENT,
    }),
    ApiUnauthorizedResponse({ description: MESSAGES.UNAUTHORIZED }),
  );
};
