import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1728761065631 implements MigrationInterface {
    name = 'CreateTableUser1728761065631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "unicity_user_first_last_name" UNIQUE ("firstName", "lastName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
