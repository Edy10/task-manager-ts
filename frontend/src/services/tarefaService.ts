export async function listarTarefas() {
    const token = localStorage.getItem("token");

    const resposta = await fetch("http://localhost:3000/tarefas", {
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
    const token = localStorage.getItem("token");

    const resposta = await fetch("http://localhost:3000/tarefas", {
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