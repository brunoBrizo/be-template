import { User } from '@users/models/user.entity';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { UserRepository } from '@users/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  // TODO: missing implementation
  async getUser(id: string): Promise<User> {
    return null;
  }

  // TODO: missing implementation
  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }
}
