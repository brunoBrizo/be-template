import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LoggerService } from '@logger/logger.service';
import { User } from '@users/models/user.entity';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { UserSearchFields } from './models/user-search-fields.enum';
import { Location } from '@common/models/location.entity';
import { Country } from '@common/models/country.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private logger: LoggerService, private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    location: Location,
    country: Country,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = this.create({ location, country, ...createUserDto });
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

  async findUser(field: UserSearchFields, value: string): Promise<User> {
    try {
      const user = await this.createQueryBuilder('user')
        .leftJoinAndSelect('user.country', 'countries')
        .where(`user.${field} = :value`, { value })
        .getOne();

      return user;
    } catch (error) {
      this.logger.error(
        `Error finding a user by ${field}. User ${field}: ${value}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
