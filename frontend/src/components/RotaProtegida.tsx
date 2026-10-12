import { Navigate } from "react-router-dom";

interface RotaProtegidaProps {
    children: React.ReactNode;
}

function RotaProtegida({ children }: RotaProtegidaProps) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />
    }

    return children;
}

export default RotaProtegida;