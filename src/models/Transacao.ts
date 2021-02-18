import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("transacao")
class Transacao {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_cliente: number;

    @Column()
    id_loja: number;

    @Column()
    id_colaborador: number;

    @Column()
    data: Date;

    @Column()
    valor: number;
}

export default Transacao;