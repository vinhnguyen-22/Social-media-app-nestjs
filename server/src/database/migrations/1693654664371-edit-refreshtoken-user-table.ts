import { MigrationInterface, QueryRunner } from "typeorm";

export class EditRefreshtokenUserTable1693654664371 implements MigrationInterface {
    name = 'EditRefreshtokenUserTable1693654664371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refresh_token" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "refresh_token" SET NOT NULL`);
    }

}
