import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/models/user.entity';

export class LoginResponse {
  @ApiProperty()
  user?: User;

  @ApiProperty()
  accessToken?: string;

  @ApiProperty()
  refreshToken?: string;
}
