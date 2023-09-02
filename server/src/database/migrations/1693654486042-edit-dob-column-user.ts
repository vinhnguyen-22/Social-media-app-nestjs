import { MigrationInterface, QueryRunner } from "typeorm";

export class EditDobColumnUser1693654486042 implements MigrationInterface {
    name = 'EditDobColumnUser1693654486042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dob" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "dob" SET NOT NULL`);
    }

}
