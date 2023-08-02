import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRrssDiffusionTable1690920858041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rrss-diffusion",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        generatedIdentity: "BY DEFAULT",
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "createdAt",
                        type: "timestamptz"
                    },
                    {
                        name: "updatedAt",
                        type: "timestamptz"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "content",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "date",
                        type: "timestamptz",
                        isNullable: false
                    },
                    {
                        name: "uuid",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "rrss-connection_id",
                        type: "int",
                        isNullable: false
                    }
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rrss-diffusion");
    }

}
