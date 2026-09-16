import type { Request, Response } from "express";
import { cadastrarUsuarioService } from "../services/usuarioService";

export async function cadastrarUsuario(req: Request, res: Response) {
    try{
        const { nome, email, senha } = req.body;

        const usuario = await cadastrarUsuarioService(nome, email, senha);

        res.status(201).json(usuario);

    } catch (erro){
        console.error("Erro ao cadastrar usuário:", erro);

        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário."
        });
    }
}