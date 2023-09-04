import { ResetPasswordDTO } from '@auth/dto/reset-password.dto';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNoContentResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { MESSAGES } from '@utils/constants';

export const ResetPasswordDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: `Reset an employee's password`,
      description: `This endpoint will be in charge of handling the employee's password reset`,
    }),
    ApiBody({ type: ResetPasswordDTO }),
    ApiNoContentResponse({
      status: HttpStatus.NO_CONTENT,
    }),
    ApiBadRequestResponse({
      status: HttpStatus.BAD_REQUEST,
      description: `${MESSAGES.INVALID_TOKEN} | ${MESSAGES.TOKEN_EXPIRED}`,
    }),
  );
};
