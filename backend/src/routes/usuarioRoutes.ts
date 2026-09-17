import { Router } from "express";
import { cadastrarUsuario, loginUsuario } from "../controllers/usuarioController";

const router = Router();

router.post("/login", loginUsuario);

router.post("/", cadastrarUsuario);

export default router;