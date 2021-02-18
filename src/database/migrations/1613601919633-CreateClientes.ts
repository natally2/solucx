import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClientes1613601919633 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clientes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "nome",
                        type: "varchar(100)",
                    },
                    {
                        name: "email",
                        type: "varchar(100)",
                    },
                    {
                        name: "telefone",
                        type: "varchar(50)",
                    },
                    {
                        name: "cpf",
                        type: "varchar(50)",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clientes");
    }

}
