import { useEffect, useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/tarefas");
        }
    }, [navigate])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setMensagem("");

        try {
            const dados = await login(email, senha);

            localStorage.setItem("token", dados.token);

            navigate("/tarefas");
        } catch (erro) {
            console.error(erro);

            if (erro instanceof Error) {
                setMensagem(erro.message);
            }
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Task Manager</h1>
                <p>Entre para acessar suas tarefas</p>

                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>E-mail </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label>Senha </label>

                        <input
                            type="password"
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                        />
                    </div>

                    <button type="submit">
                        Entrar
                    </button>
                </form>

                {mensagem && (
                    <p className="login-mensagem">
                        {mensagem}
                    </p>
                )}

            </div>
        </div>
    );
}

export default Login;