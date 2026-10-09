import { useEffect, useState } from "react";
import { excluirTarefa, atualizarTarefa, criarTarefa, listarTarefas } from "../services/tarefaService"
import type { Tarefa } from "../types/Tarefa";

function Tarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("pendente");
    const [prazo, setPrazo] = useState("");

    const [idEditando, setIdEditando] = useState<number | null>(null);

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
            if (idEditando !== null) {
                await atualizarTarefa(idEditando, titulo, descricao, status, prazo);
            } else {
                await criarTarefa(titulo, descricao, status, prazo);
            }

            const dados = await listarTarefas();
            setTarefas(dados);

            setTitulo("");
            setDescricao("");
            setStatus("pendente");
            setPrazo("");
            setIdEditando(null);

        } catch (e) {
            console.error(e);
        }
    }

    function editarTarefas(tarefa: Tarefa) {
        setIdEditando(tarefa.id);
        setTitulo(tarefa.titulo);
        setDescricao(tarefa.descricao);
        setStatus(tarefa.status);
        setPrazo(tarefa.prazo.slice(0, 10));
    }

    async function handleExcluirTarefa(id: number) {
        try {
            await excluirTarefa(id);

            const dados = await listarTarefas();
            setTarefas(dados)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h1>Minhas tarefas</h1>

            <form onSubmit={handleCriarTarefa}>
                <input type="text" placeholder="Título" value={titulo} onChange={(event) => setTitulo(event.target.value)}/>
                <input type="text" placeholder="Descrição" value={descricao} onChange={(event) => setDescricao(event.target.value)}/>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="concluida">Concluída</option>
                </select>
                <input type="date" value={prazo} onChange={(event) => setPrazo(event.target.value)}/>

                <button type="submit"> {idEditando !== null ? "Salvar alteração" : "Salvar tarefa"} </button>
            </form>

            {tarefas.map((tarefa) => (
                <div key={tarefa.id}>
                    <h3>{tarefa.titulo}</h3>
                    <p>{tarefa.descricao}</p>
                    <p>Status: {tarefa.status}</p>
                    <button onClick={() => editarTarefas(tarefa)}> Editar </button>
                    <button onClick={() =>handleExcluirTarefa(tarefa.id)}>Excluir</button>
                </div>
            ))}
        </div>
    );
}

export default Tarefas;
