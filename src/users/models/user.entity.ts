import { CustomBaseEntity } from '@database/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Country } from '../../common/models/country.entity';
import { Location } from '@src/common/models/location.entity';

@Entity('users')
export class User extends CustomBaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  email?: string;

  @ApiProperty()
  @Column()
  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty()
  @Column({ nullable: true })
  name?: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName?: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @ApiProperty()
  @Column({ nullable: true })
  phoneNumber?: string;

  @ApiProperty()
  @ManyToOne(() => Country)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ name: 'country_id' })
  @Exclude({ toPlainOnly: true })
  countryId: string;

  @ApiProperty()
  @OneToOne(() => Location, { cascade: true })
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column({ name: 'location_id', nullable: true })
  @Exclude({ toPlainOnly: true })
  locationId?: string;
}
