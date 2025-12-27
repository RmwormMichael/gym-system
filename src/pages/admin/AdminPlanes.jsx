import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { initPlanesAnimations } from "./animations/planesAnimations";

const AdminPlanes = () => {
  const [planes, setPlanes] = useState([]);
  const [form, setForm] = useState({
    nombre_plan: "",
    duracion_dias: "",
    precio: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);

  const cargarPlanes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/planes");
      setPlanes(data);
    } catch (error) {
      console.error("Error cargando planes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarPlanes();
    
    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initPlanesAnimations(containerRef, statsRef, cardsRef, formRef);
      }
    }, 100);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const crearPlan = async (e) => {
    e.preventDefault();

    try {
      await api.post("/planes", {
        ...form,
        duracion_dias: Number(form.duracion_dias),
        precio: Number(form.precio),
      });

      // Limpiar formulario
      setForm({
        nombre_plan: "",
        duracion_dias: "",
        precio: "",
        descripcion: "",
      });

      // Recargar planes
      await cargarPlanes();
      
      alert("¡Plan creado exitosamente!");
    } catch (error) {
      console.error("Error creando plan", error);
      alert("Error al crear el plan");
    }
  };

  // Filtrar planes
  const planesFiltrados = planes.filter((p) => {
    if (filtroEstado === "todos") return true;
    if (filtroEstado === "activos") return p.estado;
    if (filtroEstado === "inactivos") return !p.estado;
    return true;
  });


  return (
    <div ref={containerRef} className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Gestión de Planes
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Crea y administra los planes de suscripción del gimnasio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1: Formulario para crear plan */}
        <div className="space-y-6">
          <div ref={formRef} className="glass-effect rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-orange-400">
                  Nuevo Plan
                </h2>
                <p className="text-gray-400 text-sm">Crea un plan de suscripción</p>
              </div>
            </div>

            <form onSubmit={crearPlan} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre del plan
                </label>
                <input
                  name="nombre_plan"
                  placeholder="Ej: Plan Premium, Plan Básico..."
                  value={form.nombre_plan}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duración (días)
                  </label>
                  <input
                    name="duracion_dias"
                    type="number"
                    placeholder="Ej: 30, 90..."
                    value={form.duracion_dias}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Precio ($)
                  </label>
                  <input
                    name="precio"
                    type="number"
                    placeholder="Ej: 50000, 120000..."
                    value={form.precio}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                    min="0"
                    step="1000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descripción (opcional)
                </label>
                <textarea
                  name="descripcion"
                  placeholder="Describe los beneficios y características del plan..."
                  value={form.descripcion}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 resize-none"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-[1.02]"
              >
                Crear Plan
              </button>
            </form>
          </div>
        </div>

        {/* Columna 2: Listado de planes */}
        <div className="lg:col-span-2">
          <div className="glass-effect rounded-2xl p-5 h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-orange-400">
                    Listado de Planes
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {planesFiltrados.length} planes encontrados
                  </p>
                </div>
              </div>

              {/* Filtro */}
              <div className="flex gap-3">
                <select
                  className="px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 text-sm"
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <option value="todos">Todos los planes</option>
                  <option value="activos">Solo activos</option>
                  <option value="inactivos">Solo inactivos</option>
                </select>

                <button
                  onClick={() => setFiltroEstado("todos")}
                  className="px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl text-sm font-medium transition-all duration-300 shadow hover:shadow-lg"
                >
                  Limpiar
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-gray-400">Cargando planes...</p>
              </div>
            ) : planesFiltrados.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl border border-gray-700/50">
                <div className="text-5xl mb-4 opacity-50">📄</div>
                <p className="text-gray-400 text-lg">No hay planes registrados</p>
                <p className="text-gray-500 text-sm mt-2">
                  {filtroEstado !== "todos" 
                    ? "Intenta cambiar el filtro" 
                    : "Crea tu primer plan usando el formulario"}
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {planesFiltrados.map((p, index) => (
                  <div
                    key={p._id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="group bg-gradient-to-br from-gray-900/80 to-black/50 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${
                            p.precio > 100000 ? "bg-yellow-900/20" :
                            p.precio > 50000 ? "bg-purple-900/20" :
                            "bg-blue-900/20"
                          }`}>
                            <span className={`text-lg ${
                              p.precio > 100000 ? "text-yellow-400" :
                              p.precio > 50000 ? "text-purple-400" :
                              "text-blue-400"
                            }`}>
                              {p.precio > 100000 ? "💎" : p.precio > 50000 ? "⭐" : "📌"}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-white group-hover:text-orange-300 transition-colors">
                              {p.nombre_plan}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                p.estado 
                                  ? "bg-green-900/40 text-green-300 border border-green-700/30" 
                                  : "bg-red-900/40 text-red-300 border border-red-700/30"
                              }`}>
                                {p.estado ? "Activo" : "Inactivo"}
                              </span>
                              <span className="text-sm text-gray-400">
                                ID: {p._id.substring(0, 8)}...
                              </span>
                            </div>
                          </div>
                        </div>

                        {p.descripcion && (
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {p.descripcion}
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-gray-500 bg-gray-900/50 px-3 py-1.5 rounded-lg">
                          {new Date(p.createdAt || p.fecha_creacion).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-900/20 rounded-lg">
                              <span className="text-blue-400">💰</span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Precio</p>
                              <p className="font-bold text-xl text-white">
                                ${p.precio.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">COP</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-900/20 rounded-lg">
                              <span className="text-purple-400">📅</span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Duración</p>
                              <p className="font-bold text-xl text-white">
                                {p.duracion_dias} días
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-400">
                            ≈ {(p.duracion_dias / 30).toFixed(1)} meses
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-gray-900/30 rounded-lg h-full">
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 bg-gray-800 rounded-lg mt-1">
                              <span className="text-gray-400 text-sm">📝</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-400 mb-2">Información adicional</p>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-400">Precio por día:</span>
                                  <span className="text-sm font-semibold text-orange-400">
                                    ${Math.round(p.precio / p.duracion_dias).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-400">Valor mensual:</span>
                                  <span className="text-sm font-semibold text-green-400">
                                    ${Math.round((p.precio / p.duracion_dias) * 30).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPlanes;