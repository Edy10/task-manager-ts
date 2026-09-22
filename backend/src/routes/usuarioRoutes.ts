import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { cadastrarUsuario, loginUsuario } from "../controllers/usuarioController";

const router = Router();

router.post("/login", loginUsuario);

router.post("/", cadastrarUsuario);

router.get("/perfil", authMiddleware, (req, res) => {
    res.json({
        mensagem: "Acesso autorizado."
    });
});

export default router;