import { useEffect, useState } from "react";
import { excluirTarefa, atualizarTarefa, criarTarefa, listarTarefas } from "../services/tarefaService"
import { buscarPerfil } from "../services/authService";
import type { Tarefa } from "../types/Tarefa";
import { useNavigate } from "react-router-dom";
import "./Tarefas.css"

function Tarefas() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("pendente");
    const [prazo, setPrazo] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [nomeUsuario, setNomeUsuario] = useState("");

    const [idEditando, setIdEditando] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarDados() {
            try {
                const dadosTarefas = await listarTarefas();
                setTarefas(dadosTarefas);

                const perfil = await buscarPerfil();
                setNomeUsuario(perfil.nome);

            } catch (e) {
                console.error(e);

                if (e instanceof Error && e.message === "Token inválido") {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            }
        }

        carregarDados();
    }, [navigate]);

    async function handleCriarTarefa(event: React.FormEvent) {
        event.preventDefault();

        try {
            setCarregando(true);

            if (idEditando !== null) {
                await atualizarTarefa(idEditando, titulo, descricao, status, prazo);
                setMensagem("Tarefa atualizada com sucesso.");
            } else {
                await criarTarefa(titulo, descricao, status, prazo);
                setMensagem("Tarefa criada com sucesso.");
            }

            const dados = await listarTarefas();
            setTarefas(dados);

            limparFormulario();

        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                setMensagem(e.message);
            }
        } finally {
            setCarregando(false);
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
            setCarregando(true);

            await excluirTarefa(id);
            setMensagem("Tarefa excluída com sucesso.");

            const dados = await listarTarefas();
            setTarefas(dados)
        } catch (erro) {
            console.error(erro);
            if (erro instanceof Error) {
                setMensagem(erro.message)
            }
        } finally {
            setCarregando(false);
        }
    }

    function limparFormulario() {
        setTitulo("");
        setDescricao("");
        setStatus("pendente");
        setPrazo("");
        setIdEditando(null);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function formatarStatus(status: string) {
        if (status === "pendente") {
            return "Pendente";
        }

        if (status === "em_andamento") {
            return "Em andamento";
        }

        if (status === "concluido") {
            return "Concluído";
        }

        return status;
    }

    function formatarData(data: string) {
        if (!data) {
            return "";
        }

        const [ano, mes, dia] = data.slice(0, 10).split("-");

        return `${dia}/${mes}/${ano}`;
    }

    return (
        <div className="container">
            <div className="topo">
                <h1>Minhas tarefas </h1>

                <div className="topo-usuario">
                    <span className="usuario-logado">
                        <p>Olá, {nomeUsuario}</p>
                    </span>

                    <button className="botao-sair" type="button" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </div>

            {mensagem && <p>{mensagem}</p>}

            <form className="formulario" onSubmit={handleCriarTarefa}>
                <input type="text" placeholder="Título" value={titulo} onChange={(event) => setTitulo(event.target.value)}/>
                <input type="text" placeholder="Descrição" value={descricao} onChange={(event) => setDescricao(event.target.value)}/>
                <select value={status} onChange={(event) => setStatus(event.target.value)}>
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="concluida">Concluída</option>
                </select>
                <input type="date" value={prazo} onChange={(event) => setPrazo(event.target.value)}/>

                <button type="submit" disabled={carregando}>
                    {carregando ? "Salvando..." : idEditando !== null ? "Salvar alteração" : "Salvar tarefa"}
                </button>

                {idEditando !== null && (
                    <button type="button" onClick={limparFormulario}>
                        Cancelar edição
                    </button>
                )}
            </form>

            <div className="lista">
                {tarefas.map((tarefa) => (
                    <div className="tarefa" key={tarefa.id}>
                        <h3>{tarefa.titulo}</h3>
                        <p>{tarefa.descricao}</p>
                        <p>Status:
                            <span className={`status ${tarefa.status}`}>
                                {formatarStatus(tarefa.status)}
                            </span>
                        </p>
                        <p>Prazo: {formatarData(tarefa.prazo?.slice(0, 10))}</p>

                        <div className="acoes">
                            <button className="botao-editar" onClick={() => editarTarefas(tarefa)}>
                                Editar
                            </button>
                            <button className="botao-excluir" onClick={() =>handleExcluirTarefa(tarefa.id)} disabled={carregando}>
                                {carregando ? "Aguarde..." : "Excluir"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tarefas;
