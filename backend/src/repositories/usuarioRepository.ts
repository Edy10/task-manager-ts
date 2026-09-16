import pool from "../db";

export async  function criarUsuario(nome: string, email: string, senhaHash: string) {
    const resultado = await pool.query(
        `INSERT INTO usuarios (nome, email, senha)
         VALUES ($1, $2, $3)
         RETURNING id, nome, email`,
        [nome, email, senhaHash]
    );

    return resultado.rows[0];
}