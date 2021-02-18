import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTransacao1613601993816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transacao",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "id_cliente",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "id_loja",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "id_colaborador",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "data",
                        type: "datetime",
                        isNullable: true
                    },
                    {
                        name: "valor",
                        type: "decimal",
                        isNullable: true
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        name: "fk_id_cliente",
                        columnNames: ["id_cliente"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "clientes"
                    }),
                    new TableForeignKey({
                        name: "fk_id_loja",
                        columnNames: ["id_loja"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "lojas"
                    }),
                    new TableForeignKey({
                        name: "fk_id_coladorador",
                        columnNames: ["id_colaborador"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "colaborador"
                    }),
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transacao");
    }

}
