import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LoggerService } from '@logger/logger.service';
import { User } from '@users/models/user.entity';
import { CreateUserDto } from '@users/dtos/create-user.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private logger: LoggerService, private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    try {
      await this.save(user);
      return user;
    } catch (error) {
      this.logger.error(
        `Error creating user. User payload: ${JSON.stringify(user)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  updateUser(user: User): Promise<User> {
    return this.save(user);
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.findOne({
        where: { id },
      });

      return user;
    } catch (error) {
      this.logger.error(
        `Error finding user by id. User ID: ${id}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
