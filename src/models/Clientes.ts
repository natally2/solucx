import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("clientes")
class Clientes {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    cpf: string;
}

export default Clientes;