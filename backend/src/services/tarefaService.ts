import { criarTarefa, listarTarefasporUsuario, atualizarTarefa, excluirTarefa } from "../repositories/tarefaRepository";

export async  function criarTarefaService(
    titulo: string,
    descricao: string,
    status: string,
    prazo: string,
    usuarioId: number
) {
    if (!titulo) {
        throw new Error("Titulo é obrigatório");
    }

    return criarTarefa(titulo, descricao, status, prazo, usuarioId);
}

export async function listarTarefasService(usuarioId: number) {
    return listarTarefasporUsuario(usuarioId);
}

export async function atualizarTarefaService(id: number, titulo: string, descricao: string, status: string, prazo: string, usuarioId: number) {
    if (!titulo) {
        throw new Error("Título é obrigatório.");
    }

    const tarefa = await atualizarTarefa(id, titulo, descricao, status, prazo, usuarioId);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.")
    }

    return tarefa;
}

export async function excluirTarefasService(id: number, usuarioId: number) {
    const tarefa = await excluirTarefa(id, usuarioId);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}