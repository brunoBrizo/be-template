import { ResetPasswordRequestDto } from '@auth/dto/request-reset-password.dto';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

export const ResetPasswordRequestDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Reset a user password request',
      description: `This endpoint will be in charge of sending an email with a link to reset the user's password`,
    }),
    ApiBody({ type: ResetPasswordRequestDto }),
    ApiNoContentResponse({
      status: HttpStatus.NO_CONTENT,
    }),
  );
};
