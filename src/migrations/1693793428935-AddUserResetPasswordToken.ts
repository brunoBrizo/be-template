import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserResetPasswordToken1693793428935
  implements MigrationInterface
{
  name = 'AddUserResetPasswordToken1693793428935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "reset_password_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "reset_password_token"`,
    );
  }
}
