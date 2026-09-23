import type { Request, Response } from "express";
import { criarTarefaService, listarTarefasService, atualizarTarefaService, excluirTarefasService } from "../services/tarefaService";

export async function criarTarefaController(req: Request, res: Response) {
    try {
        const { titulo, descricao, status, prazo } = req.body;

        const usuarioId = req.usuarioId;

        if (usuarioId === undefined) {
            return res.status(401).json({
                mensagem: "Usuário náo autorizado."
            });
        }

        const tarefa = await criarTarefaService(titulo, descricao, status, prazo, usuarioId);

        return res.status(201).json(tarefa);

    } catch (erro: unknown) {
        if (erro instanceof Error) {
            return res.status(400).json({
                mensagem: erro.message
            });
        }

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

export async function listarTarefasController(req: Request, res: Response) {
    try {
        const usuarioId = req.usuarioId;

        if(usuarioId === undefined) {
            return res.status(401).json({
                mensagem: "usuario não autenticado."
            });
        }

        const tarefas = await listarTarefasService(usuarioId);

        return res.status(200).json(tarefas)

    } catch (erro: unknown) {
        if (erro instanceof Error) {
            return res.status(500).json({
                mensagem: erro.message
            });
        }

        return  res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

export async function atualizarTarefaController(req: Request, res: Response) {
    try {
        const usuarioId = req.usuarioId;
        const id = Number(req.params.id);

        if (usuarioId === undefined) {
            return res.status(401).json({
                mensagem: "usuário não autenticado."
            });
        }

        const { titulo, descricao, status, prazo } = req.body;

        const tarefa = await atualizarTarefaService(id, titulo, descricao, status, prazo, usuarioId);

        return res.status(200).json(tarefa);
    } catch (erro: unknown) {
        if (erro instanceof Error) {
            return res.status(400).json({
                mensagem: erro.message
            });
        }

        return res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}

export async function excluirTarefaController(req: Request, res: Response) {
    try {
        const usuarioId = req.usuarioId;
        const id = Number(req.params.id);

        if (usuarioId === undefined) {
            return res.status(401).json({
                mensagem: "Usuário não autenticado."
            });
        }

        await excluirTarefasService(id, usuarioId);

        return res.status(204).send();

    } catch (erro: unknown) {
        if (erro instanceof Error) {
            return res.status(401).json({
                mensagem: erro.message
            });
        }

        return  res.status(500).json({
            mensagem: "Erro interno do servidor."
        });
    }
}