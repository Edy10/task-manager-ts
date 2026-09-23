import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {buscarUsuarioPorEmail, criarUsuario} from "../repositories/usuarioRepository";

export async function cadastrarUsuarioService(nome: string, email: string, senha: string) {
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !email || !senha) {
        throw new Error("Nome, e-mail e senha são obrigatórios.");
    }

    if (!emailValido.test(email)) {
        throw new Error("E-mail inválido.");
    }

    if (senha.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    return criarUsuario(nome, email, senhaHash);
}

export async function loginUsuarioService(email: string, senha: string) {
    if (!email || !senha) {
        throw new Error("E-mail e senha são obrigatórios.");
    }

    const usuario = await buscarUsuarioPorEmail(email);

    if(!usuario) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            email: usuario.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1h"
        }
    );

    return {
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        },
        token
    };
}