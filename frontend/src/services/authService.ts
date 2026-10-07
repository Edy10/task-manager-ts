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