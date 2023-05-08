import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683535836183 implements MigrationInterface {
    name = 'Migration1683535836183'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_db4aae0a059fd4ef7709cb802b0"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "REL_db4aae0a059fd4ef7709cb802b"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "REL_db4aae0a059fd4ef7709cb802b" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_db4aae0a059fd4ef7709cb802b0" FOREIGN KEY ("address_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
