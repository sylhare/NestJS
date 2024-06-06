import { MigrationInterface, QueryRunner } from "typeorm";

export class UseUUID1717702026962 implements MigrationInterface {
    name = 'UseUUID1717702026962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_to_jobs" DROP CONSTRAINT "FK_fad2a636f6da34a607aa4e48626"`);
        await queryRunner.query(`ALTER TABLE "nest_users" DROP CONSTRAINT "PK_f02099e044f375af53d3cbb301b"`);
        await queryRunner.query(`ALTER TABLE "nest_users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "nest_users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "nest_users" ADD CONSTRAINT "PK_f02099e044f375af53d3cbb301b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users_to_jobs" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users_to_jobs" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_to_jobs" ADD CONSTRAINT "FK_fad2a636f6da34a607aa4e48626" FOREIGN KEY ("userId") REFERENCES "nest_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_to_jobs" DROP CONSTRAINT "FK_fad2a636f6da34a607aa4e48626"`);
        await queryRunner.query(`ALTER TABLE "users_to_jobs" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users_to_jobs" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest_users" DROP CONSTRAINT "PK_f02099e044f375af53d3cbb301b"`);
        await queryRunner.query(`ALTER TABLE "nest_users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "nest_users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nest_users" ADD CONSTRAINT "PK_f02099e044f375af53d3cbb301b" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users_to_jobs" ADD CONSTRAINT "FK_fad2a636f6da34a607aa4e48626" FOREIGN KEY ("userId") REFERENCES "nest_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
