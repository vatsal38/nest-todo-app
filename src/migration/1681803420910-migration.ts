import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1681803420910 implements MigrationInterface {
    name = 'migration1681803420910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_568f6197c4a1a4380f3189acf1e"`);
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "category_id" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_e383b628056351072a5f483f6bb" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_e383b628056351072a5f483f6bb"`);
        await queryRunner.query(`ALTER TABLE "todo" RENAME COLUMN "categoryId" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_568f6197c4a1a4380f3189acf1e" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
