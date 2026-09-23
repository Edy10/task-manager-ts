import pool from "../db";

export async function criarTarefa(
    titulo: string,
    descricao: string,
    status: string,
    prazo: string,
    usuarioId: number
) {
    const resultado = await pool.query(
        `INSERT INTO tarefas
           (titulo, descricao, status, prazo, usuario_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [titulo, descricao, status, prazo, usuarioId]
    );

    return resultado.rows[0];
}

export async function listarTarefasporUsuario(usuarioId: number) {
    const resultado = await pool.query(
        `SELECT id, titulo, descricao, status, prazo, usuario_id
        FROM tarefas
        WHERE usuario_id = $1
        ORDER BY id`,
        [usuarioId]
    );

    return resultado.rows;
}

export async function atualizarTarefa(id: number, titulo: string, descricao: string, status: string, prazo: string, usuarioId: number) {
    const resultado = await pool.query(
        `UPDATE tarefas
         SET titulo = $1, descricao = $2, status = $3, prazo = $4
         WHERE id = $5
           AND usuario_id = $6
         RETURNING *`,
        [titulo, descricao, status, prazo, id, usuarioId]
    );

    return resultado.rows[0];
}

export async function excluirTarefa(id: number, usuarioId: number) {
    const resultado = await pool.query(
        `DELETE FROM tarefas
         WHERE id = $1
           AND usuario_id = $2
         RETURNING *`,
        [id, usuarioId]
    );

    return resultado.rows[0];
}