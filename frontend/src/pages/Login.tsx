import { useState } from "react";
import { login } from "../services/authService";

interface LoginProps {
    onLogin: (token: string) => void;
}

function Login({ onLogin }: LoginProps) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {
            const dados = await login(email, senha);

            localStorage.setItem("token", dados.token);

            onLogin(dados.token);

            console.log(dados);
        } catch (erro) {
            console.error(erro);
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
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
        </div>
    );
}

export default Login;