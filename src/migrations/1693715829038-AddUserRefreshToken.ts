import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRefreshToken1693715829038 implements MigrationInterface {
  name = 'AddUserRefreshToken1693715829038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refresh_token" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`);
  }
}
