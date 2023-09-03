import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@users/models/user.entity';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);
