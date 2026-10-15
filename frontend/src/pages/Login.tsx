import { useEffect, useState } from "react";
import { login } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {obterToken, salvarToken} from "../services/tokenService";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = obterToken();

        if (token) {
            navigate("/tarefas");
        }
    }, [navigate])

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setMensagem("");

        try {
            const dados = await login(email, senha);

            salvarToken(dados.token);

            navigate("/tarefas");
        } catch (erro) {
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

                    <p className="login-cadastro">
                        Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
                    </p>
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