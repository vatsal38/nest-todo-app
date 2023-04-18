import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1681808966961 implements MigrationInterface {
    name = 'migration1681808966961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_e383b628056351072a5f483f6bb" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_e383b628056351072a5f483f6bb"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "categoryId"`);
    }

}
