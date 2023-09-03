import { UserRepository } from '@users/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/models/user.entity';
import { UserController } from '@users/user.controller';
import { UserService } from '@users/user.service';
import { LoggerModule } from '@logger/logger.module';
import { CountryRepository } from '@common/repositories/country.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, CountryRepository],
  exports: [UserService],
})
export class UserModule {}
