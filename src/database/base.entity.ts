import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export abstract class CustomBaseEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  createdAt?: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt?: Date;
}
