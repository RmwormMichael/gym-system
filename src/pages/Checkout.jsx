import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePlan } from "../context/PlanContext";

const Checkout = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { selectedPlan  } = usePlan();

  useEffect(() => {
    if (!selectedPlan ) {
      navigate("/");
      return;
    }

    if (!user) {
      navigate("/");
    }
  }, [selectedPlan , user, navigate]);

  if (!selectedPlan  || !user) return null;
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-28">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-[#00f2ea] mb-6 text-center">
          Confirmar Plan
        </h1>

        {/* PLAN */}
        <div className="border border-gray-700 rounded-xl p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {selectedPlan .nombre_plan}
          </h2>

          <p className="text-gray-400 text-sm mb-3">
            {selectedPlan .descripcion}
          </p>

          <div className="flex justify-between text-sm mb-2">
            <span>Duración</span>
            <span>{selectedPlan .duracion_dias} días</span>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#00f2ea]">
              ${selectedPlan .precio.toLocaleString("es-CO")}
            </span>
          </div>
        </div>

        {/* USUARIO */}
        <div className="border border-gray-700 rounded-xl p-4 mb-6 text-sm">
          <p className="font-semibold mb-1">Usuario</p>
          <p className="text-gray-400">{user.nombre}</p>
          <p className="text-gray-400">{user.correo}</p>
        </div>

        {/* ACCIONES */}
        <button
          className="w-full bg-gradient-to-r from-[#00f2ea] to-[#00d9ff] py-3 rounded-xl font-bold hover:from-[#00e5f2] hover:to-[#00c4ff] transition"
          onClick={() => {
            // Próximo paso:
            // 1. Crear pago
            // 2. Asignar plan
            // 3. Redirigir a perfil
            alert("Checkout listo 🔥 (siguiente paso pagos)");
          }}
        >
          Confirmar y continuar
        </button>

        <button
          className="w-full mt-3 text-gray-400 hover:text-white text-sm"
          onClick={() => navigate("/")}
        >
          ← Volver al Home
        </button>
      </div>
    </div>
  );
};

export default Checkout;