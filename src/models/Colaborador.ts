import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("colaborador")
class Colaborador {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
    
}

export default Colaborador;