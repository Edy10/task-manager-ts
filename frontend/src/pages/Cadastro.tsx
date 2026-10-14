import { useState } from "react";
import { cadastrarUsuario } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "./Cadastro.css"

function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    const [mensagem, setMensagem] = useState("");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setMensagem("");

        try {
            await cadastrarUsuario(nome, email, senha);

            setMensagem("Usuario cadastrado com sucesso.");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (e) {
            if (e instanceof Error) {
                setMensagem(e.message);
            }
        }

    }


    return (
        <div className="cadastro-container">
            <div className="cadastro-card">
                <h1>Cadastro</h1>

                <p className="cadastro-subtitulo">
                    Preencha seus dados para se cadastrar
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="campo">
                        <label>Nome </label>
                        <input type="text" value={nome} onChange={(event) => setNome(event.target.value)}/>
                    </div>

                    <div className="campo">
                        <label>E-mail </label>
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>

                    <div className="campo">
                        <label>Senha </label>
                        <input type="password" value={senha} onChange={(event) => setSenha(event.target.value)}/>
                    </div>

                    <button type="submit">Cadastrar</button>

                    <p className="cadastro-login">
                        Já tem uma conta? <Link to="/login"> Entrar</Link>
                    </p>
                </form>

                {mensagem && (
                    <p className="cadastro-mensagem">
                        {mensagem}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Cadastro;