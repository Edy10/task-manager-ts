import type { Request, Response } from "express";
import { cadastrarUsuarioService, loginUsuarioService } from "../services/usuarioService";

export async function cadastrarUsuario(req: Request, res: Response) {
    try{
        const { nome, email, senha } = req.body;

        const usuario = await cadastrarUsuarioService(nome, email, senha);

        return res.status(201).json(usuario);

    } catch (erro: unknown){
        if (typeof  erro === "object" && erro !== null && "code" in erro && erro.code === "23505") {
            return res.status(409).json({
                mensagem: "E-mail já cadastrado."
            });
        }

        if (erro instanceof Error) {
            return res.status(400).json({
                mensagem: erro.message
            });
        }

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