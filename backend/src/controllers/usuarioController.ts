import type { Request, Response } from "express";
import { cadastrarUsuarioService, loginUsuarioService } from "../services/usuarioService";

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

export async function loginUsuario(req: Request, res: Response) {
    try {
        const {email, senha} = req.body;
        const usuario = await loginUsuarioService(email, senha);

        res.status(200).json(usuario);

    } catch (erro: any) {
        res.status(401).json({
            mensagem: erro.message
        });
    }
}