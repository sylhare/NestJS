import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInitialTable1716384003232 implements MigrationInterface {
    name = 'AddInitialTable1716384003232';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "nest_homes" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_f143d8cd79520e69ad7cffef3e1" UNIQUE ("address"), CONSTRAINT "PK_4147898def87bbe448497c45511" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "nest_users" ("id" SERIAL NOT NULL, "name" character varying(500), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "homeId" integer, CONSTRAINT "PK_f02099e044f375af53d3cbb301b" PRIMARY KEY ("id"))');
      await queryRunner.query('ALTER TABLE "nest_users" ADD CONSTRAINT "FK_b35bacb9b034c576f3e5b5d0f15" FOREIGN KEY ("homeId") REFERENCES "nest_homes"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "nest_users" DROP CONSTRAINT "FK_b35bacb9b034c576f3e5b5d0f15"');
      await queryRunner.query('DROP TABLE "nest_users"');
      await queryRunner.query('DROP TABLE "nest_homes"');
    }

}
