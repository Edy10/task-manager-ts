import { Navigate } from "react-router-dom";
import { obterToken } from "../services/tokenService";

interface RotaProtegidaProps {
    children: React.ReactNode;
}

function RotaProtegida({ children }: RotaProtegidaProps) {
    const token = obterToken();

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children;
}

export default RotaProtegida;