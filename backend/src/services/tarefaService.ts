import { criarTarefa, listarTarefasporUsuario } from "../repositories/tarefaRepository";

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