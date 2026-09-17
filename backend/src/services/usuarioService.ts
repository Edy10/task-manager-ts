import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {buscarUsuarioPorEmail, criarUsuario} from "../repositories/usuarioRepository";

export async function cadastrarUsuarioService(nome: string, email: string, senha: string) {
    const senhaHash = await bcrypt.hash(senha, 10);

    return criarUsuario(nome, email, senhaHash);
}

export async function loginUsuarioService(email: string, senha: string) {
    const usuario = await buscarUsuarioPorEmail(email);

    if(!usuario) {
        throw new Error("Usuário não encontrado.");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
        throw new Error("Senha inválida.");
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