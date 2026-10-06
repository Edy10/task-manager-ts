import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        console.log({
            email,
            senha
        });
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label>Senha</label>

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