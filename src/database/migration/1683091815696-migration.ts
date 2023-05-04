import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683091815696 implements MigrationInterface {
    name = 'Migration1683091815696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "pId" character varying NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "address" jsonb, "password" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "resetPasswordToken" character varying, "resetPasswordExpires" TIMESTAMP, "role" character varying NOT NULL, "permissions" jsonb, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "tags" text, "date" character varying NOT NULL, "completed" boolean NOT NULL, "categoryId" uuid, "userId" uuid, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_e383b628056351072a5f483f6bb" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_e383b628056351072a5f483f6bb"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
