import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("lojas")
class Lojas {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
    
}

export default Lojas;