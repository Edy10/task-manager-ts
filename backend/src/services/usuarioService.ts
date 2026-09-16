import bcrypt from "bcrypt";
import { criarUsuario } from "../repositories/usuarioRepository";

export async function cadastrarUsuarioService(nome: string, email: string, senha: string) {
    const senhaHash = await bcrypt.hash(senha, 10);

    return criarUsuario(nome, email, senhaHash);
}