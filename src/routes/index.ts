import { Router } from "express";
import avaliacaoRouter from "./avaliacao-experiencia.routes";
import clientesRouter from "./clientes.routes";
import coladoradorRouter from "./colaborador.routes";
import lojaRouter from "./lojas.routes";
import transacaoRouter from "./transacao.routes";

const routes = Router();

routes.use("/avaliacao", avaliacaoRouter);
routes.use("/clientes", clientesRouter);
routes.use("/colaborador", coladoradorRouter);
routes.use("/lojas", lojaRouter);
routes.use("/transacao", transacaoRouter);

export default routes;