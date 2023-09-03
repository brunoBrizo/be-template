import { LoginResponse } from '@auth/models/login-response';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { MESSAGES } from '@utils/constants';

export const SignUpUserDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Sign up a user',
      description: `This endpoint will be in charge of creatinga user and returning a JWT 
                    token that will be used for later authentication`,
    }),
    ApiBody({ type: CreateUserDto }),
    ApiOkResponse({
      description: MESSAGES.LOGIN_OK,
      type: LoginResponse,
      status: HttpStatus.OK,
    }),
    ApiUnauthorizedResponse({ description: MESSAGES.UNAUTHORIZED }),
  );
};
