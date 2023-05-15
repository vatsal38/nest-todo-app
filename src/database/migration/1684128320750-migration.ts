import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1684128320750 implements MigrationInterface {
  name = 'Migration1684128320750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "audit_trail" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "audit_trail" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
