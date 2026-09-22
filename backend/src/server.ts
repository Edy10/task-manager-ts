import express from "express";
import pool from "./db";
import type  { QueryResult} from "pg";
import usuarioRoutes from "./routes/usuarioRoutes";
import tarefaRoutes from "./routes/tarefaRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
   res.json({
       mensagem: "API task Manager"
   });
});

app.use("/usuarios", usuarioRoutes);

app.use("/tarefas", tarefaRoutes);

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});

pool.query("SELECT NOW()").then((resultado: QueryResult) => {
    console.log("PostgreSQL conectado:", resultado.rows[0]);
}).catch((erro: unknown) => {
    console.log("Erro ao conectar no PostgrSQL:", erro);
});