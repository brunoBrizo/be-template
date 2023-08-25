import { UserService } from '@users/user.service';
import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
