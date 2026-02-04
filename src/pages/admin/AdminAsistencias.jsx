import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { initAsistenciasAnimations } from "./animations/asistenciasAnimations";

const AdminAsistencias = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [ultimaAsistencia, setUltimaAsistencia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activos, setActivos] = useState([]);
  const [todasAsistencias, setTodasAsistencias] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");

  const containerRef = useRef(null);
  const statsRef = useRef([]);
  const cardsRef = useRef([]);

  // 🔹 cargar todos los usuarios (no solo activos como entrenador)
  const fetchUsuarios = async () => {
    const { data } = await api.get("/usuarios");
    setUsuarios(data);
  };

  // 🔹 cargar usuarios dentro del gimnasio
  const cargarActivos = async () => {
    const { data } = await api.get("/asistencias/activos");
    setActivos(data);
  };

  // 🔹 cargar todas las asistencias (admin puede ver todo el historial)
  const cargarTodasAsistencias = async () => {
    try {
      const { data } = await api.get("/asistencias");
      setTodasAsistencias(data);
    } catch (error) {
      console.error("Error cargando asistencias", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    cargarActivos();
    cargarTodasAsistencias();

    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initAsistenciasAnimations(containerRef, statsRef, cardsRef);
      }
    }, 100);
  }, []);

  // 🔹 última asistencia del usuario
  const cargarUltimaAsistencia = async (id) => {
    if (!id) return;
    const { data } = await api.get(`/asistencias/usuario/${id}?limite=1`);
    setUltimaAsistencia(data[0]);
  };

  const registrarEntrada = async () => {
    setLoading(true);
    await api.post("/asistencias/entrada", {
      usuario_id: usuarioSeleccionado,
    });
    await cargarUltimaAsistencia(usuarioSeleccionado);
    await cargarActivos();
    await cargarTodasAsistencias();
    setLoading(false);
  };

  const registrarSalida = async () => {
    setLoading(true);
    await api.post("/asistencias/salida", {
      usuario_id: usuarioSeleccionado,
    });
    await cargarUltimaAsistencia(usuarioSeleccionado);
    await cargarActivos();
    await cargarTodasAsistencias();
    setLoading(false);
  };

  // 🔹 Función para formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 🔹 Filtrar asistencias
  const asistenciasFiltradas = todasAsistencias.filter((asistencia) => {
    const fechaAsistencia = new Date(asistencia.fecha_hora_entrada)
      .toISOString()
      .split("T")[0];
    
    const cumpleFecha = !filtroFecha || fechaAsistencia === filtroFecha;
    const cumpleUsuario = !filtroUsuario || asistencia.usuario_id?._id === filtroUsuario;
    
    return cumpleFecha && cumpleUsuario;
  });

  return (
    <div ref={containerRef} className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00f2ea] to-[#00b3ff] bg-clip-text text-transparent">
            Control de Asistencias
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Gestiona entradas, salidas y consulta el historial completo
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna 1: Control de asistencias */}
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-[#00f2ea]/20 to-[#00b3ff]/20 rounded-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#00f2ea]">
                Registrar Asistencia
              </h2>
              <p className="text-gray-400 text-sm">Control manual de acceso</p>
            </div>
          </div>

          {/* Selector usuario */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Seleccionar usuario
            </label>
            <select
              className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-[#00f2ea] focus:ring-1 focus:ring-[#00f2ea] focus:outline-none transition-all duration-200"
              value={usuarioSeleccionado}
              onChange={(e) => {
                setUsuarioSeleccionado(e.target.value);
                cargarUltimaAsistencia(e.target.value);
              }}
            >
              <option value="" className="text-gray-500">Seleccione un usuario</option>
              {usuarios.map((u) => (
                <option key={u._id} value={u._id} className="py-2">
                  {u.nombre} - {u.cedula} {!u.estado && "(Inactivo)"}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              disabled={!usuarioSeleccionado || loading}
              onClick={registrarEntrada}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              <span className="text-xl">✓</span>
              <span>Registrar Entrada</span>
            </button>

            <button
              disabled={!usuarioSeleccionado || loading}
              onClick={registrarSalida}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-red-500/25"
            >
              <span className="text-xl">↪</span>
              <span>Registrar Salida</span>
            </button>
          </div>

          {/* Última asistencia */}
          {ultimaAsistencia && (
            <div className="mb-6 p-4 bg-gradient-to-br from-gray-900/80 to-black/50 rounded-xl border border-gray-700/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-[#00f2ea]/20 rounded-lg">
                  <span className="text-[#00f2ea] text-lg">📅</span>
                </div>
                <h3 className="font-bold text-[#00f2ea]">Última asistencia</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                  <span className="text-gray-400">Entrada:</span>
                  <span className="font-medium">{formatearFecha(ultimaAsistencia.fecha_hora_entrada)}</span>
                </div>
                {ultimaAsistencia.fecha_hora_salida && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400">Salida:</span>
                    <span className="font-medium">{formatearFecha(ultimaAsistencia.fecha_hora_salida)}</span>
                  </div>
                )}
                {ultimaAsistencia.duracion_minutos && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400">Duración:</span>
                    <span className="font-bold text-green-400">{ultimaAsistencia.duracion_minutos} min</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Usuarios activos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-green-500/20 rounded-lg">
                  <span className="text-green-400 text-lg">👥</span>
                </div>
                <h3 className="font-bold text-green-400">Usuarios activos</h3>
              </div>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full">
                {activos.length}
              </span>
            </div>

            {activos.length === 0 ? (
              <div className="text-center py-8 bg-gray-900/30 rounded-xl">
                <div className="text-4xl mb-3 opacity-50">😴</div>
                <p className="text-gray-400">No hay usuarios dentro actualmente</p>
                <p className="text-gray-500 text-sm mt-1">Todos los usuarios están fuera</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {activos.map((a, index) => (
                  <div
                    key={a._id}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="group bg-gradient-to-r from-gray-900/80 to-black/50 p-4 rounded-xl border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-white group-hover:text-green-300 transition-colors">
                          {a.usuario_id.nombre}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{a.usuario_id.cedula}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-green-400 text-sm font-semibold block">
                          {new Date(a.fecha_hora_entrada).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        <span className="text-xs text-gray-500">Desde</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Columna 2: Historial completo */}
        <div className="lg:col-span-2 glass-effect rounded-2xl p-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#00f2ea]/20 to-[#00b3ff]/20 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#00f2ea]">
                  Historial de Asistencias
                </h2>
                <p className="text-gray-400 text-sm">
                  {asistenciasFiltradas.length} registros encontrados
                </p>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[150px]">
                <input
                  type="date"
                  value={filtroFecha}
                  onChange={(e) => setFiltroFecha(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-[#00f2ea] focus:ring-1 focus:ring-[#00f2ea] focus:outline-none transition-all duration-200 text-sm"
                />
              </div>
              
              <div className="relative flex-1 min-w-[180px]">
                <select
                  value={filtroUsuario}
                  onChange={(e) => setFiltroUsuario(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-[#00f2ea] focus:ring-1 focus:ring-[#00f2ea] focus:outline-none transition-all duration-200 text-sm appearance-none"
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

              <button
                onClick={() => {
                  setFiltroFecha("");
                  setFiltroUsuario("");
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl text-sm font-medium transition-all duration-300 shadow hover:shadow-lg"
              >
                Limpiar
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Activos ahora", value: activos.length, color: "text-green-400", icon: "🏃", bg: "from-green-900/30 to-emerald-900/10" },
              { label: "Total asistencias", value: todasAsistencias.length, color: "text-blue-400", icon: "📈", bg: "from-blue-900/30 to-cyan-900/10" },
              { label: "Usuarios activos", value: usuarios.filter(u => u.estado).length, color: "text-purple-400", icon: "👤", bg: "from-purple-900/30 to-violet-900/10" },
              { label: "Total usuarios", value: usuarios.length, color: "text-yellow-400", icon: "👥", bg: "from-yellow-900/30 to-amber-900/10" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                ref={(el) => (statsRef.current[index] = el)}
                className={`bg-gradient-to-br ${stat.bg} p-4 rounded-xl border border-gray-700/50 hover:scale-105 transition-transform duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                  </div>
                  <span className="text-2xl opacity-80">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Lista de asistencias */}
          {asistenciasFiltradas.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl border border-gray-700/50">
              <div className="text-5xl mb-4 opacity-50">📭</div>
              <p className="text-gray-400 text-lg">No hay asistencias registradas</p>
              <p className="text-gray-500 text-sm mt-2">Intenta cambiar los filtros de búsqueda</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {asistenciasFiltradas.map((a, index) => (
                <div
                  key={a._id}
                  className="group bg-gradient-to-br from-gray-900/80 to-black/50 p-4 rounded-xl border border-gray-700/50 hover:border-[#00f2ea]/30 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="font-bold text-white group-hover:text-[#00f2ea] transition-colors">
                          {a.usuario_id?.nombre || "Usuario eliminado"}
                        </span>
                        <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                          {a.usuario_id?.cedula || "N/A"}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          a.tipo === "entrada" 
                            ? "bg-gradient-to-r from-green-900/40 to-emerald-900/20 text-green-300 border border-green-700/30" 
                            : "bg-gradient-to-r from-red-900/40 to-rose-900/20 text-red-300 border border-red-700/30"
                        }`}>
                          {a.tipo.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-3 p-2 bg-gray-900/30 rounded-lg">
                          <span className="text-gray-500">⏰</span>
                          <div>
                            <p className="text-gray-400 text-xs">Entrada</p>
                            <p className="font-medium">{formatearFecha(a.fecha_hora_entrada)}</p>
                          </div>
                        </div>
                        
                        {a.fecha_hora_salida && (
                          <div className="flex items-center gap-3 p-2 bg-gray-900/30 rounded-lg">
                            <span className="text-gray-500">🚪</span>
                            <div>
                              <p className="text-gray-400 text-xs">Salida</p>
                              <p className="font-medium">{formatearFecha(a.fecha_hora_salida)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {a.duracion_minutos && (
                        <div className="mt-3 flex items-center gap-3 p-2 bg-blue-900/20 rounded-lg border border-blue-800/30">
                          <span className="text-blue-400">⏱️</span>
                          <div>
                            <p className="text-blue-300 text-xs">Duración total</p>
                            <p className="font-bold text-blue-300">{a.duracion_minutos} minutos</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-500 bg-gray-900/50 px-3 py-1.5 rounded-lg">
                        {new Date(a.fecha_hora_entrada).toLocaleDateString('es-ES', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })}
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
  );
};

export default AdminAsistencias;