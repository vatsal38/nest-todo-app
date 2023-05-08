import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683537909488 implements MigrationInterface {
    name = 'Migration1683537909488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_302d96673413455481d5ff4022a" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_302d96673413455481d5ff4022a" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
