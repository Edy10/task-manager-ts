import { useEffect, useState } from "react";
import {criarTarefa, listarTarefas} from "../services/tarefaService"
import type { Tarefa } from "../types/Tarefa";
import * as React from "react";

function Tarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("pendente");
    const [prazo, setPrazo] = useState("");

    useEffect(() => {
        async function carregarTarefas() {
            try {
                const dados = await listarTarefas();

                setTarefas(dados);
            } catch (e) {
                console.error(e)
            }
        }

        carregarTarefas();
    }, []);

    async function handleCriarTarefa(event: React.FormEvent) {
        event.preventDefault();
        try {
            await criarTarefa(titulo, descricao, status, prazo);

            const dados = await listarTarefas();
            setTarefas(dados);

            setTarefas("");
            setDescricao("");
            setStatus("");
            setPrazo("");

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h1>Minhas tarefas</h1>

            <form onSubmit={handleCriarTarefa}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(event) => setTitulo(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(event) => setDescricao(event.target.value)}
                />

                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                >
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="concluida">Concluída</option>
                </select>

                <input
                    type="date"
                    value={prazo}
                    onChange={(event) => setPrazo(event.target.value)}
                />

                <button type="submit">
                    Criar tarefa
                </button>
            </form>

            {tarefas.map((tarefa) => (
                <div key={tarefa.id}>
                    <h3>{tarefa.titulo}</h3>
                    <p>{tarefa.descricao}</p>
                    <p>Status: {tarefa.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Tarefas;
