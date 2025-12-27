import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { initMedicionesAnimations } from "./animations/medicionesAnimations";

const AdminMediciones = () => {
  const [mediciones, setMediciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [form, setForm] = useState({
    peso: "",
    altura: "",
    notas: "",
  });
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");

  const containerRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);
  const formRef = useRef(null);

  // Cargar todos los usuarios
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const { data } = await api.get("/usuarios");
        setUsuarios(data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      }
    };
    cargarUsuarios();
  }, []);

  // Cargar mediciones
  useEffect(() => {
    fetchMediciones();
    
    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initMedicionesAnimations(containerRef, statsRef, cardsRef, formRef);
      }
    }, 100);
  }, []);

  const fetchMediciones = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/mediciones");
      setMediciones(data);
    } catch (error) {
      console.error("Error cargando mediciones", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para guardar medición
  const guardarMedicion = async (e) => {
    e.preventDefault();

    if (!usuarioId || !form.peso || !form.altura) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    try {
      await api.post("/mediciones", {
        usuario_id: usuarioId,
        peso: Number(form.peso),
        altura: Number(form.altura),
        notas: form.notas,
      });

      // Limpiar formulario
      setForm({ peso: "", altura: "", notas: "" });
      setUsuarioId("");
      
      // Recargar mediciones
      await fetchMediciones();
      
      alert("Medición registrada exitosamente");
    } catch (error) {
      console.error("Error registrando medición", error);
      alert("Error al registrar la medición");
    }
  };

  // Filtrar mediciones
  const medicionesFiltradas = mediciones.filter((m) => {
    const fechaMedicion = new Date(m.fecha);
    const fechaInicio = filtroFechaInicio ? new Date(filtroFechaInicio) : null;
    const fechaFin = filtroFechaFin ? new Date(filtroFechaFin) : null;
    
    // Filtrar por usuario
    const cumpleUsuario = !filtroUsuario || m.usuario_id?._id === filtroUsuario;
    
    // Filtrar por fecha inicio
    const cumpleFechaInicio = !fechaInicio || fechaMedicion >= fechaInicio;
    
    // Filtrar por fecha fin
    const cumpleFechaFin = !fechaFin || fechaMedicion <= new Date(fechaFin.getTime() + 86400000);
    
    return cumpleUsuario && cumpleFechaInicio && cumpleFechaFin;
  });

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    if (medicionesFiltradas.length === 0) return null;

    const pesos = medicionesFiltradas.map(m => m.peso).filter(p => p);
    const alturas = medicionesFiltradas.map(m => m.altura).filter(a => a);
    const imcs = medicionesFiltradas.map(m => parseFloat(m.imc)).filter(i => !isNaN(i));

    const promedio = (arr) => arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0;
    const maximo = (arr) => arr.length > 0 ? Math.max(...arr).toFixed(2) : 0;
    const minimo = (arr) => arr.length > 0 ? Math.min(...arr).toFixed(2) : 0;

    return {
      total: medicionesFiltradas.length,
      promedioPeso: promedio(pesos),
      promedioAltura: promedio(alturas),
      promedioIMC: promedio(imcs),
      maxPeso: maximo(pesos),
      minPeso: minimo(pesos),
      maxIMC: maximo(imcs),
      minIMC: minimo(imcs),
    };
  };

  const estadisticas = calcularEstadisticas();

  // Calcular clasificación IMC
  const getClasificacionIMC = (imc) => {
    if (imc < 18.5) return "Bajo peso";
    if (imc < 25) return "Normal";
    if (imc < 30) return "Sobrepeso";
    return "Obesidad";
  };

  // Obtener color según IMC
  const getColorIMC = (imc) => {
    if (imc < 18.5) return "text-blue-400";
    if (imc < 25) return "text-green-400";
    if (imc < 30) return "text-yellow-400";
    return "text-red-400";
  };

  // Obtener bg color según IMC
  const getBgColorIMC = (imc) => {
    if (imc < 18.5) return "bg-blue-900/20 border-blue-700/30";
    if (imc < 25) return "bg-green-900/20 border-green-700/30";
    if (imc < 30) return "bg-yellow-900/20 border-yellow-700/30";
    return "bg-red-900/20 border-red-700/30";
  };

  return (
    <div ref={containerRef} className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Gestión de Mediciones
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Registra y consulta las mediciones físicas de los usuarios
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1: Registrar nueva medición */}
        <div className="space-y-6">
          <div ref={formRef} className="glass-effect rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-orange-400">
                  Nueva Medición
                </h2>
                <p className="text-gray-400 text-sm">Registro manual</p>
              </div>
            </div>

            <form onSubmit={guardarMedicion} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seleccionar usuario
                </label>
                <select
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  required
                >
                  <option value="" className="text-gray-500">Seleccionar usuario</option>
                  {usuarios.map((u) => (
                    <option key={u._id} value={u._id} className="py-2">
                      {u.nombre} - {u.cedula}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Peso (kg)
                  </label>
                  <input
                    placeholder="Ej: 70.5"
                    className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                    value={form.peso}
                    onChange={(e) => setForm({ ...form, peso: e.target.value })}
                    type="number"
                    step="0.1"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Altura (cm)
                  </label>
                  <input
                    placeholder="Ej: 175.0"
                    className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                    value={form.altura}
                    onChange={(e) => setForm({ ...form, altura: e.target.value })}
                    type="number"
                    step="0.1"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Observaciones
                </label>
                <textarea
                  placeholder="Notas adicionales sobre la medición..."
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 resize-none"
                  value={form.notas}
                  onChange={(e) => setForm({ ...form, notas: e.target.value })}
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-[1.02]"
              >
                Guardar Medición
              </button>
            </form>
          </div>

          {/* Estadísticas */}
          {estadisticas && (
            <div className="glass-effect rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-purple-400">
                    Estadísticas
                  </h3>
                  <p className="text-gray-400 text-sm">Resumen general</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total mediciones", value: estadisticas.total, color: "text-orange-400", icon: "📈", bg: "from-orange-900/30 to-amber-900/10" },
                  { label: "IMC Promedio", value: estadisticas.promedioIMC, color: "text-green-400", icon: "⚖️", bg: "from-green-900/30 to-emerald-900/10" },
                  { label: "Peso Promedio", value: `${estadisticas.promedioPeso} kg`, color: "text-blue-400", icon: "🏋️", bg: "from-blue-900/30 to-cyan-900/10" },
                  { label: "Altura Promedio", value: `${estadisticas.promedioAltura} cm`, color: "text-purple-400", icon: "📏", bg: "from-purple-900/30 to-violet-900/10" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    ref={(el) => (statsRef.current[index] = el)}
                    className={`bg-gradient-to-br ${stat.bg} p-3 rounded-xl border border-gray-700/50`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                      </div>
                      <span className="text-xl opacity-80">{stat.icon}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Columna 2: Historial de mediciones */}
        <div className="lg:col-span-2">
          <div className="glass-effect rounded-2xl p-5 h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-orange-400">
                    Historial de Mediciones
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {medicionesFiltradas.length} registros encontrados
                  </p>
                </div>
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[180px]">
                  <select
                    value={filtroUsuario}
                    onChange={(e) => setFiltroUsuario(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 text-sm appearance-none"
                  >
                    <option value="">Todos los usuarios</option>
                    {usuarios.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.nombre}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <span className="text-gray-400">▼</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-1 min-w-[200px]">
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 text-sm"
                      value={filtroFechaInicio}
                      onChange={(e) => setFiltroFechaInicio(e.target.value)}
                      placeholder="Desde"
                    />
                  </div>
                  
                  <div className="relative flex-1">
                    <input
                      type="date"
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 text-sm"
                      value={filtroFechaFin}
                      onChange={(e) => setFiltroFechaFin(e.target.value)}
                      placeholder="Hasta"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    setFiltroUsuario("");
                    setFiltroFechaInicio("");
                    setFiltroFechaFin("");
                  }}
                  className="px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl text-sm font-medium transition-all duration-300 shadow hover:shadow-lg"
                >
                  Limpiar
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
                <p className="text-gray-400">Cargando mediciones...</p>
              </div>
            ) : medicionesFiltradas.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl border border-gray-700/50">
                <div className="text-5xl mb-4 opacity-50">📊</div>
                <p className="text-gray-400 text-lg">No hay mediciones registradas</p>
                <p className="text-gray-500 text-sm mt-2">Intenta cambiar los filtros de búsqueda</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {medicionesFiltradas.map((m, index) => (
                  <div
                    key={m._id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="group bg-gradient-to-br from-gray-900/80 to-black/50 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-bold text-lg text-white group-hover:text-orange-300 transition-colors">
                          {m.usuario_id?.nombre || "Usuario eliminado"}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {m.usuario_id?.cedula || "N/A"} • 
                          <span className="ml-2">
                            {new Date(m.fecha).toLocaleDateString('es-ES', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </p>
                      </div>
                      
                      <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${getBgColorIMC(m.imc)} ${getColorIMC(m.imc)}`}>
                        {getClasificacionIMC(m.imc)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-900/20 rounded-lg">
                              <span className="text-blue-400">⚖️</span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Peso</p>
                              <p className="font-bold text-lg">{m.peso} kg</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-900/20 rounded-lg">
                              <span className="text-purple-400">📏</span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Altura</p>
                              <p className="font-bold text-lg">{m.altura} cm</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className={`text-center p-4 rounded-xl ${getBgColorIMC(m.imc)} border-2 ${getColorIMC(m.imc).replace('text-', 'border-')}`}>
                          <p className="text-3xl font-bold mb-1">{m.imc}</p>
                          <p className={`text-sm font-semibold ${getColorIMC(m.imc)}`}>IMC</p>
                          <p className={`text-xs mt-2 ${getColorIMC(m.imc)}`}>
                            {getClasificacionIMC(m.imc)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="h-full p-3 bg-gray-900/30 rounded-lg">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="p-1.5 bg-gray-800 rounded-lg mt-1">
                              <span className="text-gray-400 text-sm">📝</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-400 mb-2">Observaciones</p>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {m.notas || (
                                  <span className="text-gray-500 italic">
                                    Sin observaciones registradas
                                  </span>
                                )}
                              </p>
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

export default AdminMediciones;