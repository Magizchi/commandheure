import { MigrationInterface, QueryRunner } from "typeorm";

export class Categories1708342630081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO category (id, name) VALUES
            (1,"Alwadi"),
            (2,"Amandes"),
            (3,"Arachides"),
            (4,"Cereales"),
            (5,"Couscous"),
            (6,"Epices"),
            (7,"Farines"),
            (8,"Grignotages"),
            (9,"Haricots"),
            (10,"LegumesSec"),
            (11,"Lentilles"),
            (12,"Pates"),
            (13,"Riz"),
            (14,"Semoules"),
            (15,"SpecialiteSalees"),
            (16,"SpecialiteSucrees")`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
