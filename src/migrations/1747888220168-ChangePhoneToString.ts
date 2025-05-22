import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangePhoneToString1747888220168 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" TYPE VARCHAR`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "phone" TYPE INTEGER`,
    );
  }
}
