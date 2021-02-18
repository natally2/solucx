import { Router } from "express";
import { getRepository } from "typeorm";
import * as yup from "yup";
import Transacao from "../models/Transacao";

const transacaoRouter = Router();

transacaoRouter.post('/', async (req, res) => {
    const { id_cliente, id_loja, id_colaborador, data, valor } = req.body;
    const id = req.params.id_transacao;

    const schema = yup.object({
        id_cliente: yup.number().integer().positive()
        .required("Id do cliente é obrigatório!"),
        id_loja: yup.number().integer().positive()
        .required("Id da loja é obrigatório!"),
        id_colaborador: yup.number()
        .required()
        .integer("O id deve ser um número inteiro!")
        .positive("O id deve ser um número positivo!"),
        valor: yup.number()
        .required()
        .positive("O valor deve ser um número positivo!"),
        data: yup.date().required("A data é obrigatória!")
    });

    try {
        await schema.validate({id, id_cliente, id_loja, id_colaborador, data, valor});
        const transacaoRepository = getRepository(Transacao);
    
        const transacao = transacaoRepository.create({
            id_cliente,
            id_loja,
            id_colaborador,
            data: new Date(), 
            valor
        });
    
        await transacaoRepository.save(transacao);

        return res.status(200).json(transacao);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});


transacaoRouter.put('/:id_transacao', async (req, res) => {
    const { id_cliente, id_loja, id_colaborador, data, valor } = req.body;
    const id = req.params.id_transacao;

    const schema = yup.object({
        id: yup.number().integer().positive()
        .required("Id da transação é obrigatório!"),
        id_cliente: yup.number().integer().positive()
        .required("Id do cliente é obrigatório!"),
        id_loja: yup.number().integer().positive()
        .required("Id da loja é obrigatório!"),
        id_colaborador: yup.number()
        .integer("O id deve ser um número inteiro")
        .positive("O id deve ser um número positivo"),
        valor: yup.number()
        .required()
        .positive("O valor deve ser um número positivo!"),
        data: yup.date().required()
    });

    try {
        await schema.validate({id, id_cliente, id_loja, id_colaborador, data, valor});
        const transacaoRepository = getRepository(Transacao);
    
        const transacao = transacaoRepository.findOne(id);

        if (!transacao) throw new Error("Transação não existe!");

        await transacaoRepository.update(id, {
            id_cliente,
            id_loja,
            id_colaborador,
            data: new Date(), 
            valor
        });
    
        return res.status(200).json({success: "Transação atualizada com sucesso!"});
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

export default transacaoRouter;