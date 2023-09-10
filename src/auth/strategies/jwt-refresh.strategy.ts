import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ENV_VARS, JWT_REFRESH_STRATEGY, MESSAGES } from '@utils/constants';
import { UserService } from '@users/user.service';
import { JwtPayload } from '@auth/models/jwt-payload.interface';
import { User } from '@users/models/user.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_STRATEGY,
) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>(ENV_VARS.JWT_REFRESH_TOKEN_SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: JwtPayload): Promise<User> {
    const refreshToken = this.extractTokenFromHeader(request);

    if (!refreshToken) {
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN);
    }

    const { userId } = payload;
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN);
    }

    const isRefreshTokenMatching = user.refreshToken === refreshToken;

    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN);
    }

    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
