import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683175396316 implements MigrationInterface {
    name = 'Migration1683175396316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

}
