import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1573492839395 implements MigrationInterface {
    name = 'Init1573492839395'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "name" character varying(32) NOT NULL, "permissions" character varying(512) array NOT NULL DEFAULT '{}'::varchar[], "token" character(16) NOT NULL, "password" character varying(128) NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_a854e557b1b14814750c7c7b0c9" UNIQUE ("token"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e11e649824a45d8ed01d597fd9" ON "user" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "user" ("name") `, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a854e557b1b14814750c7c7b0c" ON "user" ("token") `, undefined);
        await queryRunner.query(`CREATE TABLE "meta" ("id" integer NOT NULL, "name" character varying(128) NOT NULL, "description" character varying(1024) NOT NULL, "logoUrl" character varying(1024) NOT NULL DEFAULT '', "customHtml" text NOT NULL DEFAULT '', "defaultPermissions" character varying(512) array NOT NULL DEFAULT '{}'::varchar[], "recaptchaSiteKey" character varying(64) NOT NULL DEFAULT '', "recaptchaSecretKey" character varying(64) NOT NULL DEFAULT '', CONSTRAINT "PK_c4c17a6c2bd7651338b60fc590b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "file_folder" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "name" character varying(128) NOT NULL, "parentId" character varying, CONSTRAINT "PK_5e4a450a108c94fb03fd0e54899" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1562dd2ff08759a440c83fdb06" ON "file_folder" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3cfeae30d91febe6eb7e6f493a" ON "file_folder" ("parentId") `, undefined);
        await queryRunner.query(`CREATE TABLE "file" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "md5" character varying(32) NOT NULL, "file" character varying(32) NOT NULL, "name" character varying(256) NOT NULL, "type" character varying(128) NOT NULL, "size" integer NOT NULL, "comment" character varying(512), "properties" jsonb NOT NULL DEFAULT '{}', "folderId" character varying, "commitMessage" character varying(512), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_18a0ad156828b598fcef570209" ON "file" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d336bee718f4b96da84e8a2b1c" ON "file" ("updatedAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_66027a8bd3581665d9202f9afb" ON "file" ("md5") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6a9056555f14365e6a7345d5d3" ON "file" ("file") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_65593ce703593144d5a8f5fddf" ON "file" ("type") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_3563fb0d3e9557359f541ac77d" ON "file" ("folderId") `, undefined);
        await queryRunner.query(`CREATE TABLE "page" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "title" character varying(256) NOT NULL, "subTitle" character varying(256) NOT NULL, "path" character varying(256) NOT NULL, "content" character varying(65536) NOT NULL, "category" character varying(256) NOT NULL DEFAULT '', "tags" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], "links" character varying(1024) array NOT NULL DEFAULT '{}'::varchar[], "eyeCatchingImageId" character varying, "attributes" jsonb NOT NULL DEFAULT '{}', "commitMessage" character varying(512), "ast" jsonb NOT NULL, "defAst" jsonb NOT NULL, "isLocked" boolean NOT NULL DEFAULT false, "isPinned" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_c626d5727165ae77d148007940d" UNIQUE ("path"), CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_fbb4297c927a9b85e9cefa2eb1" ON "page" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_af639b066dfbca78b01a920f8a" ON "page" ("updatedAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c626d5727165ae77d148007940" ON "page" ("path") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d45c7f3ce05fbf1c50578921eb" ON "page" ("category") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b5bcba6a0a18ec34f4a4ffe795" ON "page" ("tags") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a50bd3734e46e0bcc14b521189" ON "page" ("links") `, undefined);
        await queryRunner.query(`CREATE TABLE "template" ("id" character varying NOT NULL, "name" character varying(256) NOT NULL, "attributes" character varying(128) array NOT NULL DEFAULT '{}'::varchar[], CONSTRAINT "UQ_a62147c0d6b868e797061e142a1" UNIQUE ("name"), CONSTRAINT "PK_fbae2ac36bd9b5e1e793b957b7f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a62147c0d6b868e797061e142a" ON "template" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "commit" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "type" character varying(128) NOT NULL, "action" character varying(16) NOT NULL, "key" character varying(32) NOT NULL, "message" character varying(512), "data" jsonb NOT NULL DEFAULT '{}', "userId" character varying NOT NULL, CONSTRAINT "PK_98f1c01f7e878fc55476f332c4e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_80d67d6d7a11c78852f086c4d7" ON "commit" ("createdAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_46fd2f28221f606d62d012c2b2" ON "commit" ("type") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_5fb0d9b021b222e16cd1e5cf01" ON "commit" ("action") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_bb020f001518bc918939848d43" ON "commit" ("key") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_534811f15500cb31e16cc73bd8" ON "commit" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "file_folder" ADD CONSTRAINT "FK_3cfeae30d91febe6eb7e6f493a5" FOREIGN KEY ("parentId") REFERENCES "file_folder"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_3563fb0d3e9557359f541ac77da" FOREIGN KEY ("folderId") REFERENCES "file_folder"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "page" ADD CONSTRAINT "FK_a9ca79ad939bf06066b81c9d3aa" FOREIGN KEY ("eyeCatchingImageId") REFERENCES "file"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "commit" ADD CONSTRAINT "FK_534811f15500cb31e16cc73bd8d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "commit" DROP CONSTRAINT "FK_534811f15500cb31e16cc73bd8d"`, undefined);
        await queryRunner.query(`ALTER TABLE "page" DROP CONSTRAINT "FK_a9ca79ad939bf06066b81c9d3aa"`, undefined);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_3563fb0d3e9557359f541ac77da"`, undefined);
        await queryRunner.query(`ALTER TABLE "file_folder" DROP CONSTRAINT "FK_3cfeae30d91febe6eb7e6f493a5"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_534811f15500cb31e16cc73bd8"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_bb020f001518bc918939848d43"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5fb0d9b021b222e16cd1e5cf01"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_46fd2f28221f606d62d012c2b2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_80d67d6d7a11c78852f086c4d7"`, undefined);
        await queryRunner.query(`DROP TABLE "commit"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a62147c0d6b868e797061e142a"`, undefined);
        await queryRunner.query(`DROP TABLE "template"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a50bd3734e46e0bcc14b521189"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b5bcba6a0a18ec34f4a4ffe795"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d45c7f3ce05fbf1c50578921eb"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c626d5727165ae77d148007940"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_af639b066dfbca78b01a920f8a"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_fbb4297c927a9b85e9cefa2eb1"`, undefined);
        await queryRunner.query(`DROP TABLE "page"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_3563fb0d3e9557359f541ac77d"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_65593ce703593144d5a8f5fddf"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6a9056555f14365e6a7345d5d3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_66027a8bd3581665d9202f9afb"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d336bee718f4b96da84e8a2b1c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_18a0ad156828b598fcef570209"`, undefined);
        await queryRunner.query(`DROP TABLE "file"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_3cfeae30d91febe6eb7e6f493a"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1562dd2ff08759a440c83fdb06"`, undefined);
        await queryRunner.query(`DROP TABLE "file_folder"`, undefined);
        await queryRunner.query(`DROP TABLE "meta"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a854e557b1b14814750c7c7b0c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_065d4d8f3b5adb4a08841eae3c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e11e649824a45d8ed01d597fd9"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }

}
