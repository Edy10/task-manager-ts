import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { criarTarefaController, listarTarefasController, atualizarTarefaController, excluirTarefaController } from "../controllers/tarefaController";

const router = Router();

router.post("/", authMiddleware, criarTarefaController);
router.get("/", authMiddleware, listarTarefasController);
router.put("/:id", authMiddleware, atualizarTarefaController);
router.delete("/:id", authMiddleware, excluirTarefaController);

export default router;