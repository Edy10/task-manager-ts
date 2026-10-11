export async function login(email: string, senha: string) {
    const resposta = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            senha
        })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao realizar login.");
    }

    return dados;
}

export async function buscarPerfil() {
    const token = localStorage.getItem("token");

    const resposta = await fetch("http://localhost:3000/usuarios/perfil", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao buscar perfil");
    }

    return dados;
}