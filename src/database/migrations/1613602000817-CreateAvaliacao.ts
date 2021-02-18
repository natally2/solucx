import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAvaliacao1613602000817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "avaliacao",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "id_transacao",
                        type: "int",
                    },
                    {
                        name: "nota",
                        type: "int",
                    },
                    {
                        name: "comentario",
                        type: "varchar(100)",
                    }
                ],
                foreignKeys: [
                    new TableForeignKey({
                        name: "fk_id_transacao",
                        columnNames: ["id_transacao"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "transacao"
                    })
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("avaliacao");
    }

}
