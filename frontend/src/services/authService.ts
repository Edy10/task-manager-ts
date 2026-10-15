import { obterToken } from "./tokenService";

const API_URL = "http://localhost:3000";

export async function login(email: string, senha: string) {
    const resposta = await fetch(`${API_URL}/usuarios/login`, {
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
    const token = obterToken();

    const resposta = await fetch(`${API_URL}/usuarios/perfil`, {
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

export async function cadastrarUsuario(nome: string, email: string, senha: string) {
    const resposta =  await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            nome,
            email,
            senha
        })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar usuário.");
    }

    return dados;
}