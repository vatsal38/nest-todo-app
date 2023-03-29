import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1680095629089 implements MigrationInterface {
    name = 'migration1680095629089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_d429b7114371f6a35c5cb4776a7"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "category_id" uuid`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_568f6197c4a1a4380f3189acf1e" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_568f6197c4a1a4380f3189acf1e"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_d429b7114371f6a35c5cb4776a7" FOREIGN KEY ("id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
