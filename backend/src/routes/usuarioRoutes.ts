import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { cadastrarUsuario, loginUsuario, buscarPerfilController } from "../controllers/usuarioController";

const router = Router();

router.post("/login", loginUsuario);

router.post("/", cadastrarUsuario);

router.get("/perfil", authMiddleware, buscarPerfilController);

export default router;