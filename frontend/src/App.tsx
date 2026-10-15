import { BrowserRouter, Routes,  Route, Navigate } from "react-router-dom";
import RotaProtegida from "./components/RotaProtegida";
import Login from "./pages/Login";
import Tarefas from "./pages/Tarefas";
import Cadastro from "./pages/Cadastro";
import NaoEncontrado from "./pages/NaoEncontrada";

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route
              path="/"
              element={<Navigate to="/login" replace />}
            />

            <Route
                path="/cadastro"
                element={<Cadastro />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/tarefas"
              element={
                <RotaProtegida>
                    <Tarefas />
                </RotaProtegida>
              }
            />

            <Route
                path="*"
                element={<NaoEncontrado />}
            />
        </Routes>
    </BrowserRouter>
    );
}

export default App;
