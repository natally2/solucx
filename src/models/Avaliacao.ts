import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("avaliacao")
class Avaliacao {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_transacao: number;

    @Column()
    nota: string;

    @Column()
    comentario: string;

}

export default Avaliacao;