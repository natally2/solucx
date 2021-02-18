import { Router } from "express";
import { getRepository } from "typeorm";
import * as yup from "yup";
import Clientes from "../models/Clientes";

const clientesRouter = Router();

clientesRouter.get('/', async (req, res) => {
    try {
        const clientesRepository = getRepository(Clientes);

        const clientes = await clientesRepository.find();

        if (!clientes.length) {
            throw new Error("Nenhum cliente encontrado!");
        }

        return res.json(clientes);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

clientesRouter.post('/', async (req, res) => {  
    const { nome, email, telefone, cpf } = req.body;

    const schema = yup.object({
        nome: yup.string()
        .required('O nome é obrigatório.')
        .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
        email: yup.string()
        .email('Email não possui formato válido.')
        .required('O email é obrigatório!')
        .min(5, 'Email deve ter no mínimo 5 caracteres.'),
        telefone: yup.string()
        .required()
        .min(11, 'Telefone deve ter no mínimo 11 caracteres.'),
        cpf: yup.string()
        .required('O cpf é obrigatório')
        .min(11, 'CPF deve ter no mínimo 11 caracteres.')
    });

    try {
        await schema.validate({nome, email, telefone, cpf});

        const clientesRepository = getRepository(Clientes);
    
        const clientes = clientesRepository.create({
            nome,
            email,
            telefone,
            cpf
        });
    
        await clientesRepository.save(clientes);

        return res.json(clientes);
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

clientesRouter.put('/:id_cliente', async (req, res) => {
    const { nome, email, telefone, cpf } = req.body;
    const id = req.params.id_cliente;

    const schema = yup.object({
        nome: yup.string()
        .required('O nome é obrigatório.')
        .min(3, 'O nome deve ter no mínimo 3 caracteres.'),
        email: yup.string()
        .email('Email não possui formato válido.')
        .required('O email é obrigatório!')
        .min(5, 'Email deve ter no mínimo 5 caracteres.'),
        telefone: yup.string()
        .required()
        .min(11, 'Telefone deve ter no mínimo 11 caracteres.'),
        cpf: yup.string()
        .required('O cpf é obrigatório')
        .min(11, 'CPF deve ter no mínimo 11 caracteres.')
    });

    try {
        await schema.validate({id, nome, email, telefone, cpf});

        const clientesRepository = getRepository(Clientes);

        const clientes = await clientesRepository.findOne(id);

        if (!clientes) {
            throw new Error("Nenhum cliente encontrado!")
        }
    
        await clientesRepository.update(id, {
            nome,
            email,
            telefone,
            cpf
        });
    
        return res.json({success: "Usuário editado com sucesso!"});
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

clientesRouter.delete('/:id_cliente', async (req, res) => {
    const id = req.params.id_cliente;

    const schema = yup.object({
        id: yup.number().integer().positive().required("Id do cliente é obrigatório!")
    });
    
    try {
        await schema.validate({id});

        const clientesRepository = getRepository(Clientes);

        const clientes = await clientesRepository.findOne(id);

        if (!clientes) throw new Error("Nenhum cliente encontrado!");
        
        await clientesRepository.delete(clientes);

        return res.json("Cliente excluído com sucesso!");
    } catch (err) {
        return res.status(400).json({error: true, message: err.message});
    }
});

export default clientesRouter;