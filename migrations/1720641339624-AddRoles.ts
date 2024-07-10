import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoles1720641339624 implements MigrationInterface {
    name = 'AddRoles1720641339624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nest_roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9dce1349ac8f6657fcb6524ba37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nest_jobs_roles_nest_roles" ("nestJobsId" integer NOT NULL, "nestRolesId" integer NOT NULL, CONSTRAINT "PK_064ba8c1535aea1b667e97ec09f" PRIMARY KEY ("nestJobsId", "nestRolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23500af0af059bdc258888f0b5" ON "nest_jobs_roles_nest_roles" ("nestJobsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_aab78f1c3e9787e5afa77c9568" ON "nest_jobs_roles_nest_roles" ("nestRolesId") `);
        await queryRunner.query(`ALTER TABLE "nest_jobs_roles_nest_roles" ADD CONSTRAINT "FK_23500af0af059bdc258888f0b5c" FOREIGN KEY ("nestJobsId") REFERENCES "nest_jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "nest_jobs_roles_nest_roles" ADD CONSTRAINT "FK_aab78f1c3e9787e5afa77c95683" FOREIGN KEY ("nestRolesId") REFERENCES "nest_roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nest_jobs_roles_nest_roles" DROP CONSTRAINT "FK_aab78f1c3e9787e5afa77c95683"`);
        await queryRunner.query(`ALTER TABLE "nest_jobs_roles_nest_roles" DROP CONSTRAINT "FK_23500af0af059bdc258888f0b5c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aab78f1c3e9787e5afa77c9568"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_23500af0af059bdc258888f0b5"`);
        await queryRunner.query(`DROP TABLE "nest_jobs_roles_nest_roles"`);
        await queryRunner.query(`DROP TABLE "nest_roles"`);
    }

}
