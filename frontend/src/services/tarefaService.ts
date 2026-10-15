import { obterToken } from "./tokenService";

const API_URL = "http://localhost:3000";

export async function listarTarefas() {
    const token = obterToken();

    const resposta = await fetch(`${API_URL}/tarefas`, {
       method: "GET",
       headers: {
           Authorization: `Bearer ${token}`
       }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem || "Erro ao listar tarefas."
        );
    }

    return dados;
}

export async function criarTarefa(titulo: string, descricao: string, status: string, prazo: string) {
    const token = obterToken();

    const resposta = await fetch(`${API_URL}/tarefas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            titulo,
            descricao,
            status,
            prazo
        })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem || "Erro ao criar tarefa."
        );
    }

    return dados;
}

export async function atualizarTarefa(id: number, titulo: string, descricao: string, status: string, prazo: string) {
    const token = obterToken();

    const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            titulo,
            descricao,
            status,
            prazo
        })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            dados.mensagem || "Erro ao atualizar tarefas."
        );
    }

    return dados;
}

export async function excluirTarefa(id: number) {
   const token = obterToken();

   const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
       method: "DELETE",
       headers: {
           Authorization: `Bearer ${token}`
       }
   });

   if (!resposta.ok) {
       const  dados = await resposta.json();

       throw new  Error(
           dados.mensagem || "Erro ao excluir tarefa."
       )
   }
}