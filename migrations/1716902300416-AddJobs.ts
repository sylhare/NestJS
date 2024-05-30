import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddJobs1716902300416 implements MigrationInterface {
    name = 'AddJobs1716902300416';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "nest_jobs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_6c8d0179d499dcb79f0fb833da7" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "users_to_jobs" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "jobId" integer NOT NULL, CONSTRAINT "PK_8a4604e6690b9c93800590906e2" PRIMARY KEY ("id"))');
      await queryRunner.query('ALTER TABLE "users_to_jobs" ADD CONSTRAINT "FK_fad2a636f6da34a607aa4e48626" FOREIGN KEY ("userId") REFERENCES "nest_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "users_to_jobs" ADD CONSTRAINT "FK_80ae9cde0edb87463f9aa9ff818" FOREIGN KEY ("jobId") REFERENCES "nest_jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "users_to_jobs" DROP CONSTRAINT "FK_80ae9cde0edb87463f9aa9ff818"');
      await queryRunner.query('ALTER TABLE "users_to_jobs" DROP CONSTRAINT "FK_fad2a636f6da34a607aa4e48626"');
      await queryRunner.query('DROP TABLE "users_to_jobs"');
      await queryRunner.query('DROP TABLE "nest_jobs"');
    }

}
