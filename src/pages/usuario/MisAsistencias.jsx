import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { initMisAsistenciasAnimations } from "./animations/misAsistenciasAnimations";

const MisAsistencias = () => {
  const { user } = useAuth();
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroMes, setFiltroMes] = useState("actual");

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const filtersRef = useRef([]);

  useEffect(() => {
    const fetchAsistencias = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/asistencias/usuario/${user.uid}?limite=50`);
        setAsistencias(data);
      } catch (error) {
        console.error("Error cargando asistencias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsistencias();

    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initMisAsistenciasAnimations(containerRef, cardsRef, statsRef, filtersRef);
      }
    }, 100);
  }, []);

  // Calcular estadísticas basadas en datos reales
  const calcularEstadisticas = () => {
    const hoy = new Date();
    const mesActual = hoy.getMonth();
    const añoActual = hoy.getFullYear();

    const asistenciasMesActual = asistencias.filter((a) => {
      const fecha = new Date(a.fecha_hora_entrada);
      return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
    });

    const asistenciasCompletas = asistencias.filter(a => a.fecha_hora_salida);
    const tiempoTotalMinutos = asistenciasCompletas.reduce((total, a) => {
      return total + (a.duracion_minutos || 0);
    }, 0);

    const ultimaAsistencia = asistencias[0];
    const primeraAsistencia = asistencias[asistencias.length - 1];

    return {
      total: asistencias.length,
      mesActual: asistenciasMesActual.length,
      tiempoTotal: Math.round(tiempoTotalMinutos / 60), // horas
      promedioDiario: asistencias.length > 0 
        ? (asistenciasCompletas.length / asistencias.length * 100).toFixed(0) 
        : 0,
      ultimaFecha: ultimaAsistencia ? new Date(ultimaAsistencia.fecha_hora_entrada) : null,
      primeraFecha: primeraAsistencia ? new Date(primeraAsistencia.fecha_hora_entrada) : null,
    };
  };

  const estadisticas = calcularEstadisticas();

  // Filtrar asistencias según el mes seleccionado
  const asistenciasFiltradas = asistencias.filter((a) => {
    if (filtroMes === "todos") return true;
    
    const fecha = new Date(a.fecha_hora_entrada);
    const hoy = new Date();
    
    if (filtroMes === "actual") {
      return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
    }
    
    if (filtroMes === "pasado") {
      const mesPasado = new Date(hoy.getFullYear(), hoy.getMonth() - 1, 1);
      return fecha.getMonth() === mesPasado.getMonth() && fecha.getFullYear() === mesPasado.getFullYear();
    }
    
    return true;
  });

  // Formatear fecha para mejor visualización
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Formatear hora
  const formatearHora = (fecha) => {
    return new Date(fecha).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtener nombre del mes
  const getNombreMes = (mes) => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[mes];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Cargando asistencias...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-effect rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg">
              <span className="text-2xl">🏋️‍♂️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Mis Asistencias
              </h1>
              <p className="text-gray-400 text-sm">
                Historial de tu actividad en el gimnasio
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { 
              label: "Total asistencias", 
              value: estadisticas.total, 
              color: "text-orange-400", 
              icon: "📊", 
              bg: "from-orange-900/30 to-amber-900/10" 
            },
            { 
              label: "Este mes", 
              value: estadisticas.mesActual, 
              color: "text-green-400", 
              icon: "📅", 
              bg: "from-green-900/30 to-emerald-900/10",
              subtext: getNombreMes(new Date().getMonth())
            },
            { 
              label: "Tiempo total", 
              value: `${estadisticas.tiempoTotal}h`, 
              color: "text-blue-400", 
              icon: "⏱️", 
              bg: "from-blue-900/30 to-cyan-900/10" 
            },
            { 
              label: "Completitud", 
              value: `${estadisticas.promedioDiario}%`, 
              color: "text-purple-400", 
              icon: "✅", 
              bg: "from-purple-900/30 to-violet-900/10" 
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

        {/* Filtros */}
        <div className="glass-effect rounded-2xl p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gray-800 rounded-lg">
                <span className="text-gray-400">🔍</span>
              </div>
              <h3 className="font-bold text-gray-300">Filtrar por mes</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                { id: "actual", label: "Mes actual", icon: "📅" },
                { id: "pasado", label: "Mes pasado", icon: "📆" },
                { id: "todos", label: "Todos", icon: "📋" },
              ].map((filtro, index) => (
                <button
                  key={filtro.id}
                  ref={(el) => (filtersRef.current[index] = el)}
                  onClick={() => setFiltroMes(filtro.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    filtroMes === filtro.id
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                      : "bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                  }`}
                >
                  <span>{filtro.icon}</span>
                  <span>{filtro.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Mostrando {asistenciasFiltradas.length} de {asistencias.length} asistencias
            </p>
            {estadisticas.primeraFecha && (
              <p className="text-xs text-gray-500">
                Desde {estadisticas.primeraFecha.toLocaleDateString('es-ES', { 
                  day: 'numeric', 
                  month: 'short', 
                  year: 'numeric' 
                })}
              </p>
            )}
          </div>
        </div>

        {/* Historial de asistencias */}
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-400">
                  Historial de Asistencias
                </h2>
                <p className="text-gray-400 text-sm">
                  {asistenciasFiltradas.length} registros encontrados
                </p>
              </div>
            </div>
          </div>

          {asistenciasFiltradas.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl">
              <div className="text-5xl mb-4 opacity-50">🏋️‍♂️</div>
              <p className="text-gray-400 text-lg">No hay asistencias registradas</p>
              <p className="text-gray-500 text-sm mt-2">
                {filtroMes !== "todos" 
                  ? `No hay asistencias para el ${filtroMes === "actual" ? "mes actual" : "mes pasado"}`
                  : "Aún no has registrado asistencias"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {asistenciasFiltradas.map((a, index) => (
                <div
                  key={a._id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group bg-gradient-to-br from-gray-900/80 to-black/50 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          a.fecha_hora_salida 
                            ? "bg-gradient-to-r from-green-900/20 to-emerald-900/10" 
                            : "bg-gradient-to-r from-yellow-900/20 to-amber-900/10"
                        }`}>
                          <span className={`text-lg ${
                            a.fecha_hora_salida ? "text-green-400" : "text-yellow-400"
                          }`}>
                            {a.fecha_hora_salida ? "✅" : "⏳"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white group-hover:text-orange-300 transition-colors">
                            {formatearFecha(a.fecha_hora_entrada)}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {formatearHora(a.fecha_hora_entrada)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${
                        a.fecha_hora_salida 
                          ? "bg-green-900/30 text-green-300 border border-green-700/30" 
                          : "bg-yellow-900/30 text-yellow-300 border border-yellow-700/30"
                      }`}>
                        {a.fecha_hora_salida ? "Completada" : "En curso"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-900/20 rounded-lg">
                            <span className="text-blue-400">⏰</span>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Entrada</p>
                            <p className="font-medium">{formatearHora(a.fecha_hora_entrada)}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatearFecha(a.fecha_hora_entrada)}
                        </span>
                      </div>
                      
                      {a.fecha_hora_salida && (
                        <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-900/20 rounded-lg">
                              <span className="text-red-400">🚪</span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Salida</p>
                              <p className="font-medium">{formatearHora(a.fecha_hora_salida)}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatearFecha(a.fecha_hora_salida)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {a.duracion_minutos && (
                        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-900/20 to-violet-900/10 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-900/30 rounded-lg">
                              <span className="text-purple-400">⏱️</span>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Duración total</p>
                              <p className="font-bold text-lg text-purple-300">
                                {a.duracion_minutos} minutos
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            ≈ {Math.round(a.duracion_minutos / 60)}h {a.duracion_minutos % 60}m
                          </span>
                        </div>
                      )}
                      
                      <div className="p-3 bg-gray-900/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">ID de registro</span>
                          <span className="text-xs text-gray-500 font-mono">
                            {a._id?.substring(0, 8)}...
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-400">Tipo</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            a.tipo === "entrada" 
                              ? "bg-blue-900/40 text-blue-300" 
                              : "bg-green-900/40 text-green-300"
                          }`}>
                            {a.tipo?.toUpperCase() || "ENTRADA"}
                          </span>
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
  );
};

export default MisAsistencias;