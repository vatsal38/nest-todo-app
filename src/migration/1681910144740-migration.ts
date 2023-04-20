import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1681910144740 implements MigrationInterface {
    name = 'Migration1681910144740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "whole"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "whole" character varying NOT NULL`);
    }

}
