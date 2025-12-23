import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PerfilUsuario from "./pages/PerfilUsuario";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <PerfilUsuario />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
