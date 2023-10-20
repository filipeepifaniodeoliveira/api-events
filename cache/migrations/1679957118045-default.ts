import { MigrationInterface, QueryRunner } from "typeorm";

export class default1679957118045 implements MigrationInterface {
    name = 'default1679957118045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "participant" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "category" text NOT NULL, "avatar" text NOT NULL, CONSTRAINT "PK_64da4237f502041781ca15d4c41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "local" text NOT NULL, "type" text NOT NULL, "date" text NOT NULL, "agents" text NOT NULL, "avatar" text NOT NULL, "url" text NOT NULL, "user_id" integer, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_participant" ("event_id" integer NOT NULL, "participant_id" integer NOT NULL, CONSTRAINT "PK_48e9b4820e2b2f9c6b921b4c330" PRIMARY KEY ("event_id", "participant_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8fd5818ed624f0ea3b4d5dee65" ON "event_participant" ("event_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4884944cc2c7f689b64eb825ad" ON "event_participant" ("participant_id") `);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_e6358bd3df1b2874637dca92bcf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event_participant" ADD CONSTRAINT "FK_8fd5818ed624f0ea3b4d5dee652" FOREIGN KEY ("event_id") REFERENCES "participant"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_participant" ADD CONSTRAINT "FK_4884944cc2c7f689b64eb825ad6" FOREIGN KEY ("participant_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_participant" DROP CONSTRAINT "FK_4884944cc2c7f689b64eb825ad6"`);
        await queryRunner.query(`ALTER TABLE "event_participant" DROP CONSTRAINT "FK_8fd5818ed624f0ea3b4d5dee652"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_e6358bd3df1b2874637dca92bcf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4884944cc2c7f689b64eb825ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8fd5818ed624f0ea3b4d5dee65"`);
        await queryRunner.query(`DROP TABLE "event_participant"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "participant"`);
    }

}
