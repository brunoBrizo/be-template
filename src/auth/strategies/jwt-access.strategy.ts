import { JwtPayload } from '@auth/models/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@users/models/user.entity';
import { UserService } from '@users/user.service';
import { ENV_VARS, MESSAGES } from '@utils/constants';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>(ENV_VARS.JWT_ACCESS_TOKEN_SECRET),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { userId } = payload;
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new UnauthorizedException(MESSAGES.INVALID_TOKEN);
    }

    return user;
  }
}
