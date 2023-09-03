import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LoggerService } from '@logger/logger.service';
import { Country } from '@common/models/country.entity';
import { CountrySearchFields } from '@common/models/country-search-fields.enum';

@Injectable()
export class CountryRepository extends Repository<Country> {
  constructor(private logger: LoggerService, private dataSource: DataSource) {
    super(Country, dataSource.createEntityManager());
  }

  async findCountry(
    field: CountrySearchFields,
    value: string,
  ): Promise<Country> {
    try {
      const country = await this.createQueryBuilder('country')
        .where(`country.${field} = :value`, { value })
        .getOne();

      return country;
    } catch (error) {
      this.logger.error(
        `Error finding a country by ${field}. Country ${field}: ${value}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
