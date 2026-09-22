import { Router } from "express";
import { criarTarefaController, listarTarefasController } from "../controllers/tarefaController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, criarTarefaController);
router.get("/", authMiddleware, listarTarefasController);

export default router;