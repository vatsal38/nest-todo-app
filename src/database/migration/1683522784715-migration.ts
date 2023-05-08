import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683522784715 implements MigrationInterface {
    name = 'Migration1683522784715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "permissions" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "permissions" DROP NOT NULL`);
    }

}
