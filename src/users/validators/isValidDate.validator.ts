import { MESSAGES } from '@utils/constants';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidationOptions } from 'joi';

@ValidatorConstraint({ name: 'IsValidDate', async: false })
@Injectable()
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date): boolean {
    return date <= new Date();
  }

  defaultMessage(): string {
    return MESSAGES.DATE_LESS_THAN_TODAY;
  }
}

export const IsValidDate = (validationOptions?: ValidationOptions) => {
  return (object: unknown, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateConstraint,
    });
  };
};
