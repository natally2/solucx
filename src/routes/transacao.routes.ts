import { Router } from "express";
import { getRepository } from "typeorm";
import * as yup from "yup";
import Transacao from "../models/Transacao";

const transacaoRouter = Router();

transacaoRouter.post('/', async (req, res) => {
    const { id_cliente, id_loja, id_colaborador, data, valor } = req.body;
    const id = req.params.id_transacao;

    const schema = yup.object({
        id: yup.number().integer().positive()
        .required("Id da transação é obrigatório!"),
        id_cliente: yup.number().integer().positive()
        .required("Id do cliente é obrigatório!"),
        id_loja: yup.number().integer().positive()
        .required("Id da loja é obrigatório!"),
        id_colaborador: yup.number().integer().positive(),
        valor: yup.number().required().positive(),
        data: yup.date().required()
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

        return res.json(transacao);
    } catch (err) {
        return res.send(err.message);
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
        id_colaborador: yup.number().integer().positive(),
        valor: yup.number().required().positive(),
        data: yup.date().required()
    });

    try {
        await schema.validate({id, id_cliente, id_loja, id_colaborador, data, valor});
        const transacaoRepository = getRepository(Transacao);
    
        await transacaoRepository.update(id, {
            id_cliente,
            id_loja,
            id_colaborador,
            data: new Date(), 
            valor
        });
    
        return res.json({success: "Transação atualizada com sucesso!"});
    } catch (err) {
        return res.send(err.message);
    }
});

export default transacaoRouter;