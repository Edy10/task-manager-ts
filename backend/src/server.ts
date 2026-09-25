import express from "express";
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