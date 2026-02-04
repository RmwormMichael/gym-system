import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PerfilUsuario from "./pages/usuario/PerfilUsuario";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/admin/Admin";
import Entrenador from "./pages/entrenador/Entrenador";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminPlanes from "./pages/admin/AdminPlanes";
import AdminAsistencias from "./pages/admin/AdminAsistencias";
import AdminMediciones from "./pages/admin/AdminMediciones";
import Checkout from "./pages/Checkout";
import { PlanProvider } from "./context/PlanContext";

function App() {
  return (
    <BrowserRouter>
      <PlanProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Usuario normal */}
          <Route
            path="/perfil"
            element={
              <PrivateRoute roles={["CLIENTE"]}>
                <PerfilUsuario />
              </PrivateRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <Admin />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/usuarios"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <AdminUsuarios />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/planes"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <AdminPlanes />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/mediciones"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <AdminMediciones />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/asistencias"
            element={
              <PrivateRoute roles={["ADMIN"]}>
                <AdminAsistencias />
              </PrivateRoute>
            }
          />

          {/* Entrenador */}
          <Route
            path="/entrenador"
            element={
              <PrivateRoute roles={["ENTRENADOR"]}>
                <Entrenador />
              </PrivateRoute>
            }
          />
        </Routes>
      </PlanProvider>
    </BrowserRouter>
  );
}

export default App;
