import {Link, Links} from "react-router-dom";

function NaoEncontrado() {
    return (
        <div>
            <h1>404</h1>
            <p>Página não encontrada.</p>

            <Link to="/login">
                Voltar para o login
            </Link>
        </div>
    );
}

export default NaoEncontrado;