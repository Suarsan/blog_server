import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateRrssTypeTable1690503598166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rrss-type",
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
                        type: "date"
                    },
                    {
                        name: "updatedAt",
                        type: "date"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                ],
            }),
            true
        );
        await queryRunner.createTable(
            new Table({
                name: "rrss-connection",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generatedIdentity: "BY DEFAULT",
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "createdAt",
                        type: "date"
                    },
                    {
                        name: "updatedAt",
                        type: "date"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "tokens",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "type_id",
                        type: "int",
                        isNullable: false
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rrss-type");
        await queryRunner.dropTable("rrss-connection");
    }

}
