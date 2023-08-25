import { User } from '@users/models/user.entity';
import { CustomBaseEntity } from '@database/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('countries')
export class Country extends CustomBaseEntity {
  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
