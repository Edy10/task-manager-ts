import { BrowserRouter, Routes,  Route, Navigate } from "react-router-dom";
import RotaProtegida from "./components/RotaProtegida";
import Login from "./pages/Login";
import Tarefas from "./pages/Tarefas";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route
              path="/"
              element={<Navigate to="/login" />}
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
        </Routes>
      </BrowserRouter>
  );
}

export default App;
