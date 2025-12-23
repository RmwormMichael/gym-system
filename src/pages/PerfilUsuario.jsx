import { useAuth } from "../context/AuthContext";

const PerfilUsuario = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>

      <div className="bg-gray-800 p-6 rounded-xl space-y-3">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Email:</strong> {user.correo}</p>
        <p><strong>Teléfono:</strong> {user.telefono}</p>
        <p><strong>Plan:</strong> {user.plan}</p>
        <p><strong>cédula:</strong> {user.cedula}</p>
        <p><strong>estado:</strong> {user.estado}</p>
        <p><strong>lesiones:</strong> {user.lesiones}</p>
      </div>
    </div>
  );
};

export default PerfilUsuario;
