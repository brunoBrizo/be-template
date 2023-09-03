import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Country } from '@src/common/models/country.entity';
import { CustomBaseEntity } from '@database/base.entity';

@Entity('locations')
export class Location extends CustomBaseEntity {
  @ApiProperty()
  @Column({ name: 'street_address_1' })
  streetAddress1: string;

  @ApiProperty()
  @Column({ name: 'street_address_2', nullable: true })
  streetAddress2: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ name: 'country_id', nullable: true })
  @Exclude({ toPlainOnly: true })
  counryId: string;
}
