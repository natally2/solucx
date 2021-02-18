import { Router } from "express";
import { getRepository } from "typeorm";
import * as yup from "yup";
import Lojas from "../models/Lojas";

const lojasRouter = Router();

/**
 * @swagger
 * /lojas:
 *  get:
 *    description: Retorna uma lista com todas as lojas
 *    responses:
 *      '200':
 *        description: Retorna sucesso
 *      '400':
 *        description: Retorna mensagem de erro
 */
lojasRouter.get('/', async (req, res) => {
    try {
        const lojasRepository = getRepository(Lojas);

        const lojas = await lojasRepository.find();

        if (!lojas.length) {
            throw new Error("Nenhum loja encontrada!");
        }

        return res.status(200).json(lojas);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

/**
 * @swagger
 * /clientes:
 *  post:
 *    description: Insere dados (nome) para fazer criar uma loja
 *    responses:
 *      '200':
 *        description: Retorna sucesso
 *      '400':
 *        description: Retorna mensagem de erro
 */
lojasRouter.post('/', async (req, res) => {
    const { nome } = req.body;

    const schema = yup.object({
        nome: yup.string().required("O nome é obrigatório.")
        .min(3, "O nome deve ter no mínimo 3 caracteres.")
    });
    
    try {
        await schema.validate({nome});

        const lojasRepository = getRepository(Lojas);
    
        const lojas = lojasRepository.create({
            nome
        });
    
        await lojasRepository.save(lojas);

        return res.status(200).json(lojas);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

/**
 * @swagger
 * /clientes:
 *  put:
 *    description: Recebe dados (nome) para atualizar uma loja
 *    responses:
 *      '200':
 *        description: Retorna sucesso
 *      '400':
 *        description: Retorna mensagem de erro
 */
lojasRouter.put('/:id_lojas', async (req, res) => {
    const { nome } = req.body;
    const id = req.params.id_lojas;

    const schema = yup.object({
        id: yup.number()
        .integer("O id deve ser um número inteiro")
        .positive("O id deve ser um número positivo!")
        .required("O id é obrigatório!"),
        nome: yup.string()
        .required("O nome é obrigatório.")
        .min(3, "O nome deve ter no mínimo 3 caracteres.")
    });
    
    try {
        await schema.validate({id, nome});

        const lojasRepository = getRepository(Lojas);
    
        const lojas = await lojasRepository.findOne(id);

        if (!lojas) {
            throw new Error("Nenhum loja encontrada!")
        }

        await lojasRepository.update(id, {
            nome
        });
    
        return res.status(200).json({success: "Loja editada com sucesso!"});
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

/**
 * @swagger
 * /clientes:
 *  delete:
 *    description: Recebe um id de uma loja para excluir
 *    responses:
 *      '200':
 *        description: Retorna sucesso
 *      '400':
 *        description: Retorna mensagem de erro
 */
lojasRouter.delete('/:id_lojas', async (req, res) => {
    const id = req.params.id_lojas;

    const schema = yup.object({
        id: yup.number().integer().positive().required("Id da loja é obrigatório!")
    });

    try {
        await schema.validate({id});

        const lojasRepository = getRepository(Lojas);

        const lojas = await lojasRepository.findOne(id);

        if (!lojas) throw new Error("Nenhuma loja encontrada!");
        
        await lojasRepository.delete(lojas);

        return res.status(200).json("Loja excluída com sucesso!");
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

export default lojasRouter;