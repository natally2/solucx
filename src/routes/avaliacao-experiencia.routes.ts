import { Router } from "express";
import { getRepository } from "typeorm";
import * as yup from "yup";
import Avaliacao from "../models/Avaliacao";
import Transacao from "../models/Transacao";

const avaliacaoRouter = Router();

avaliacaoRouter.get('/', async (req, res) => {
    try {
        const avaliacaoRepository = getRepository(Avaliacao);

        const avaliacao = await avaliacaoRepository.find();

        if (!avaliacao.length) {
            throw new Error("Nenhuma avaliação encontrada!");
        }

        return res.status(200).json(avaliacao);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});


avaliacaoRouter.post('/', async (req, res) => {
    const { id_transacao, nota, comentario } = req.body;
    const avaliacaoRepository = getRepository(Avaliacao);
    const transacaoRepository = getRepository(Transacao);

    const schema = yup.object({
        id_transacao: yup.number()
        .integer()
        .positive()
        .required("Id da transação é obrigatório!"),
        nota: yup
        .number()
        .integer("A nota deve ser um número inteiro")
        .positive("A nota deve ser um número positivo")
        .required("A nota é obrigatória")
        .test("A nota deve ser um número de 0 a 10.", (nota: any) => nota > 0 && nota <= 10),
        comentario: yup.string().min(4, 'Comentário deve ter no mínimo 4 caracteres.')
    });

    try {
        await schema.validate({id_transacao, nota, comentario});
      
        const transacao = await transacaoRepository.findOne({id: id_transacao});
        if (!transacao) throw new Error("Id da transação não existe. Insira outro e tente novamente!");
    
        const avaliacao = avaliacaoRepository.create({
            id_transacao,
            nota,
            comentario
        });
    
        await avaliacaoRepository.save(avaliacao);

        return res.json(avaliacao);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

export default avaliacaoRouter;