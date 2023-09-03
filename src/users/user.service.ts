import { User } from '@users/models/user.entity';
import { CreateUserDto } from '@users/dtos/create-user.dto';
import { UserRepository } from '@users/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSearchFields } from './models/user-search-fields.enum';
import { MESSAGES } from '@utils/constants';
import { Location } from '@src/common/models/location.entity';
import { CountryRepository } from '@common/repositories/country.repository';
import { CountrySearchFields } from '@common/models/country-search-fields.enum';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private countryRepository: CountryRepository,
  ) {}

  getUserById(id: string): Promise<User> {
    return this.userRepository.findUser(UserSearchFields.id, id);
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findUser(UserSearchFields.email, email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const [user, country] = await Promise.all([
      this.getUserByEmail(createUserDto.email),
      this.countryRepository.findCountry(
        CountrySearchFields.code,
        createUserDto.countryCode,
      ),
    ]);

    if (user) {
      throw new BadRequestException(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    if (!country) {
      throw new BadRequestException(MESSAGES.COUNTRY_NOT_FOUND);
    }

    const location = new Location();
    location.city = createUserDto.city;
    location.country = country;
    location.streetAddress1 = createUserDto.streetAddress1;
    location.streetAddress2 = createUserDto.streetAddress2;

    return this.userRepository.createUser(location, country, createUserDto);
  }

  async updateRefreshToken(user: User, refreshToken: string): Promise<void> {
    user.refreshToken = refreshToken;
    await this.userRepository.updateUser(user);
  }
}
