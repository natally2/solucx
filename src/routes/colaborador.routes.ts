import { Router } from "express";
import * as yup from "yup";
import { getRepository } from "typeorm";
import Colaborador from "../models/Colaborador";

const colaboradorRouter = Router();

colaboradorRouter.get('/', async (req, res) => {
    try {
        const colaboradorRepository = getRepository(Colaborador);

        const colaborador = await colaboradorRepository.find();

        if (!colaborador.length) {
            throw new Error("Nenhum colaborador encontrado!")
        }

        return res.json(colaborador);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

colaboradorRouter.post('/', async (req, res) => {
    const { nome } = req.body;

    const schema = yup.object({
        nome: yup.string().required().min(3, 'O nome deve ter no mínimo 3 caracteres.')
    });

    try {
        await schema.validate({nome});

        const colaboradorRepository = getRepository(Colaborador);
    
        const colaborador = colaboradorRepository.create({
            nome
        });
    
        await colaboradorRepository.save(colaborador);

        return res.json(colaborador);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

colaboradorRouter.put('/:id_colaborador', async (req, res) => {
    const { nome } = req.body;
    const id = req.params.id_colaborador;

    const schema = yup.object({
        id: yup.number()
        .integer()
        .positive()
        .required("O id é obrigatório!"),
        nome: yup.string().required().min(3, 'O nome deve ter no mínimo 3 caracteres.')
    });

    try {
        await schema.validate({id, nome});

        const colaboradorRepository = getRepository(Colaborador);
    
        await colaboradorRepository.update(id, {
            nome
        });

        return res.json({success: "Usuário editado com sucesso!"});
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

colaboradorRouter.delete('/:id_colaborador', async (req, res) => {
    const id = req.params.id_colaborador;

    const schema = yup.object({
        id: yup.number().integer().positive().required("Id do colaborador é obrigatório!")
    });

    try {
        await schema.validate({id});

        const colaboradorRepository = getRepository(Colaborador);

        const colaborador = await colaboradorRepository.findOne(id);

        if (!colaborador) throw new Error("Nenhum usuário encontrado!");
        
        await colaboradorRepository.delete(colaborador);

        return res.json({success: "Usuário excluído com sucesso!"});
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

export default colaboradorRouter;