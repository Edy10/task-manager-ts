import { useState } from "react";
import Login from "./pages/Login";
import Tarefas from "./pages/Tarefas";

function App() {
  const [token, setToken] = useState(
      localStorage.getItem("token")
  );

  if (!token) {
    return <Login onLogin={setToken} />
  }

  return <Tarefas onLogout={() => setToken(null)} />;
}

export default App;
