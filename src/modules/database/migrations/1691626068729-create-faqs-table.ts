import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateFaqsTable1691626068729 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "faqs",
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
                        name: "question",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "answer",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "post_id",
                        type: "int",
                        isNullable: false
                    }
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("faqs");
    }

}
