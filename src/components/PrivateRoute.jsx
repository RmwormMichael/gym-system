import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Esperar a que el contexto termine de cargar
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  // Si no hay usuario → fuera
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Usuario válido → renderizar
  return children;
};

export default PrivateRoute;
