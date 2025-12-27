import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { initAsistenciasEntrenadorAnimations } from "./animations/asistenciasAnimations";

const AsistenciasEntrenador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
  const [ultimaAsistencia, setUltimaAsistencia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activos, setActivos] = useState([]);

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const formRef = useRef(null);
  const buttonsRef = useRef([]);

  // 🔹 cargar usuarios activos
  const fetchUsuarios = async () => {
    const { data } = await api.get("/usuarios?estado=true");
    setUsuarios(data);
  };

  // 🔹 cargar usuarios dentro del gimnasio
  const cargarActivos = async () => {
    const { data } = await api.get("/asistencias/activos");
    setActivos(data);
  };

  useEffect(() => {
    fetchUsuarios();
    cargarActivos();

    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initAsistenciasEntrenadorAnimations(containerRef, cardsRef, formRef, buttonsRef);
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
    setLoading(false);
  };

  const registrarSalida = async () => {
    setLoading(true);
    await api.post("/asistencias/salida", {
      usuario_id: usuarioSeleccionado,
    });
    await cargarUltimaAsistencia(usuarioSeleccionado);
    await cargarActivos();
    setLoading(false);
  };

  // Formatear fecha para mejor visualización
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Formatear hora solamente
  const formatearHora = (fecha) => {
    return new Date(fecha).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div ref={containerRef} className="animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg">
              <span className="text-2xl">🏋️‍♂️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Control de Asistencias
              </h1>
              <p className="text-gray-400 text-sm">
                Registra entradas y salidas de usuarios
              </p>
            </div>
          </div>

          {/* Selector usuario */}
          <div ref={formRef} className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Seleccionar usuario
            </label>
            <select
              className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
              value={usuarioSeleccionado}
              onChange={(e) => {
                setUsuarioSeleccionado(e.target.value);
                cargarUltimaAsistencia(e.target.value);
              }}
            >
              <option value="" className="text-gray-500">Seleccione un usuario</option>
              {usuarios.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.nombre} - {u.cedula}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              ref={(el) => buttonsRef.current[0] = el}
              disabled={!usuarioSeleccionado || loading}
              onClick={registrarEntrada}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:scale-[1.02]"
            >
              <span className="text-xl">✅</span>
              <span>Registrar Entrada</span>
            </button>

            <button
              ref={(el) => buttonsRef.current[1] = el}
              disabled={!usuarioSeleccionado || loading}
              onClick={registrarSalida}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:scale-[1.02]"
            >
              <span className="text-xl">🚪</span>
              <span>Registrar Salida</span>
            </button>
          </div>

          {/* Última asistencia */}
          {ultimaAsistencia && (
            <div className="bg-gradient-to-br from-gray-900/80 to-black/50 p-4 rounded-xl border border-gray-700/50 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-orange-500/20 rounded-lg">
                  <span className="text-orange-400">📅</span>
                </div>
                <h3 className="font-bold text-orange-400">Última asistencia</h3>
              </div>
              <div className="space-y-3 text-sm">
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
                    <span className="font-bold text-green-400">{ultimaAsistencia.duracion_minutos} minutos</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Usuarios activos */}
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-400">
                  Usuarios activos
                </h2>
                <p className="text-gray-400 text-sm">Actualmente en el gimnasio</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-semibold rounded-full">
              {activos.length}
            </span>
          </div>

          {activos.length === 0 ? (
            <div className="text-center py-8 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl">
              <div className="text-5xl mb-3 opacity-50">😴</div>
              <p className="text-gray-400">No hay usuarios dentro actualmente</p>
              <p className="text-gray-500 text-sm mt-1">Todos los usuarios están fuera</p>
            </div>
          ) : (
            <div className="space-y-3">
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
                        {formatearHora(a.fecha_hora_entrada)}
                      </span>
                      <span className="text-xs text-gray-500">Desde</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-800/50">
                    <p className="text-xs text-gray-400">
                      Entrada: {formatearFecha(a.fecha_hora_entrada)}
                    </p>
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

export default AsistenciasEntrenador;