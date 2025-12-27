import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { initMisPlanesAnimations } from "./animations/misPlanesAnimations";

const MisPlanes = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [planActivo, setPlanActivo] = useState(false);

  const containerRef = useRef(null);
  const planCardRef = useRef(null);
  const statsRef = useRef([]);
  const detailsRef = useRef([]);

  useEffect(() => {
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/planes?estado=true");

        // Por ahora tomamos el primero (luego se asocia al usuario)
        if (data.length > 0) {
          setPlan(data[0]);
          // Simulamos que el plan está activo (esto debería venir del backend)
          setPlanActivo(true);
        }
      } catch (error) {
        console.error("Error cargando plan", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();

    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initMisPlanesAnimations(containerRef, planCardRef, statsRef, detailsRef, planActivo);
      }
    }, 100);
  }, [planActivo]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Cargando información del plan...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <div className="glass-effect rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Mi Plan
                </h1>
                <p className="text-gray-400 text-sm">
                  Información de tu suscripción actual
                </p>
              </div>
            </div>
          </div>

          <div className="text-center py-12 glass-effect rounded-2xl">
            <div className="text-5xl mb-4 opacity-50">📄</div>
            <p className="text-gray-400 text-lg">No tienes un plan asignado</p>
            <p className="text-gray-500 text-sm mt-2">
              Contacta con administración para adquirir un plan
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calcular información basada en los datos reales
  const precioPorDia = Math.round(plan.precio / plan.duracion_dias);
  const diasTranscurridos = Math.floor(Math.random() * plan.duracion_dias); // Esto debería venir del backend
  const diasRestantes = plan.duracion_dias - diasTranscurridos;
  const porcentajeProgreso = (diasTranscurridos / plan.duracion_dias) * 100;

  return (
    <div ref={containerRef} className="animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Mi Plan
              </h1>
              <p className="text-gray-400 text-sm">
                Información de tu suscripción actual
              </p>
            </div>
          </div>
        </div>

        {/* Tarjeta principal del plan */}
        <div ref={planCardRef} className="glass-effect rounded-2xl p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                plan.precio > 100000 ? "bg-gradient-to-r from-yellow-900/30 to-amber-900/20" :
                plan.precio > 50000 ? "bg-gradient-to-r from-purple-900/30 to-violet-900/20" :
                "bg-gradient-to-r from-blue-900/30 to-cyan-900/20"
              }`}>
                <span className={`text-3xl ${
                  plan.precio > 100000 ? "text-yellow-400" :
                  plan.precio > 50000 ? "text-purple-400" :
                  "text-blue-400"
                }`}>
                  {plan.precio > 100000 ? "💎" : plan.precio > 50000 ? "⭐" : "📌"}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{plan.nombre_plan}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    planActivo 
                      ? "bg-green-900/40 text-green-300 border border-green-700/30" 
                      : "bg-red-900/40 text-red-300 border border-red-700/30"
                  }`}>
                    {planActivo ? "Activo" : "Inactivo"}
                  </span>
                  <span className="text-sm text-gray-400">
                    ID: {plan._id?.substring(0, 8)}...
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-400">Estado del plan</p>
              <p className={`text-lg font-bold ${planActivo ? "text-green-400" : "text-red-400"}`}>
                {planActivo ? "Vigente" : "Vencido"}
              </p>
            </div>
          </div>

          {/* Descripción del plan */}
          {plan.descripcion && (
            <div ref={(el) => (detailsRef.current[0] = el)} className="mb-6 p-4 bg-gray-900/30 rounded-xl border border-gray-700/50">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gray-800 rounded-lg mt-1">
                  <span className="text-gray-400">📝</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-2">Descripción del plan</p>
                  <p className="text-gray-300">{plan.descripcion}</p>
                </div>
              </div>
            </div>
          )}

          {/* Estadísticas principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { 
                label: "Precio total", 
                value: `$${plan.precio.toLocaleString()}`, 
                color: "text-green-400", 
                icon: "💰", 
                bg: "from-green-900/30 to-emerald-900/10" 
              },
              { 
                label: "Duración", 
                value: `${plan.duracion_dias} días`, 
                color: "text-blue-400", 
                icon: "📅", 
                bg: "from-blue-900/30 to-cyan-900/10",
                subtext: `≈ ${Math.round(plan.duracion_dias / 30)} meses`
              },
              { 
                label: "Precio por día", 
                value: `$${precioPorDia.toLocaleString()}`, 
                color: "text-purple-400", 
                icon: "📊", 
                bg: "from-purple-900/30 to-violet-900/10" 
              },
              { 
                label: "Valor mensual", 
                value: `$${Math.round(precioPorDia * 30).toLocaleString()}`, 
                color: "text-orange-400", 
                icon: "📈", 
                bg: "from-orange-900/30 to-amber-900/10" 
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                ref={(el) => (statsRef.current[index] = el)}
                className={`bg-gradient-to-br ${stat.bg} p-4 rounded-xl border border-gray-700/50 hover:scale-105 transition-transform duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    {stat.subtext && (
                      <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                    )}
                  </div>
                  <span className="text-2xl opacity-80">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Barra de progreso (simulada - debería venir del backend) */}
          <div ref={(el) => (detailsRef.current[1] = el)} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-400">Progreso del plan</p>
              <p className="text-sm font-semibold">
                {diasTranscurridos} de {plan.duracion_dias} días
              </p>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${porcentajeProgreso}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Inicio</span>
              <span>{diasRestantes} días restantes</span>
              <span>Fin</span>
            </div>
          </div>

          {/* Información adicional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-700/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-blue-900/20 rounded-lg">
                  <span className="text-blue-400">ℹ️</span>
                </div>
                <h4 className="font-semibold text-blue-400">Detalles del plan</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Fecha de inicio:</span>
                  <span className="text-gray-300">--/--/----</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fecha de vencimiento:</span>
                  <span className="text-gray-300">--/--/----</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estado de pago:</span>
                  <span className="text-green-400">Al día</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-700/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-green-900/20 rounded-lg">
                  <span className="text-green-400">✅</span>
                </div>
                <h4 className="font-semibold text-green-400">Beneficios incluidos</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-300">Acceso ilimitado al gimnasio</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-300">Uso de equipos y máquinas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-300">Asesoría básica</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Acciones del plan */}
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-orange-900/20 rounded-lg">
              <span className="text-orange-400">⚡</span>
            </div>
            <h3 className="font-bold text-orange-400">Acciones disponibles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 hover:from-blue-800/40 hover:to-cyan-800/30 rounded-xl border border-gray-700/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <p className="font-semibold">Ver detalles</p>
                  <p className="text-xs text-gray-400">Información completa</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/20 hover:from-green-800/40 hover:to-emerald-800/30 rounded-xl border border-gray-700/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔄</span>
                <div className="text-left">
                  <p className="font-semibold">Renovar</p>
                  <p className="text-xs text-gray-400">Extender plan</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 bg-gradient-to-r from-purple-900/30 to-violet-900/20 hover:from-purple-800/40 hover:to-violet-800/30 rounded-xl border border-gray-700/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💳</span>
                <div className="text-left">
                  <p className="font-semibold">Método de pago</p>
                  <p className="text-xs text-gray-400">Actualizar información</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisPlanes;