import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  // No autenticado
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Rol no permitido
  if (roles && !roles.includes(user.rol)) {
    if (user.rol === "ADMIN") return <Navigate to="/admin" replace />;
    if (user.rol === "ENTRENADOR") return <Navigate to="/entrenador" replace />;
    return <Navigate to="/perfil" replace />;
  }

  return children;
};

export default PrivateRoute;
