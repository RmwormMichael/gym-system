import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { initMisMedicionesAnimations } from "./animations/misMedicionesAnimations";

const MisMediciones = () => {
  const { user } = useAuth();
  const [mediciones, setMediciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const chartRef = useRef(null);

  const cargarMediciones = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/mediciones/usuario/${user.uid}`);
      setMediciones(data.mediciones || []);
    } catch (error) {
      console.error("Error cargando mediciones:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMediciones();

    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initMisMedicionesAnimations(containerRef, cardsRef, statsRef, chartRef);
      }
    }, 100);
  }, []);

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    if (mediciones.length === 0) return null;

    const pesos = mediciones.map(m => m.peso).filter(p => p);
    const imcs = mediciones.map(m => parseFloat(m.imc)).filter(i => !isNaN(i));
    
    const ultimaMedicion = mediciones[mediciones.length - 1];
    const primeraMedicion = mediciones[0];

    return {
      total: mediciones.length,
      pesoActual: ultimaMedicion?.peso || 0,
      imcActual: ultimaMedicion?.imc || 0,
      pesoInicial: primeraMedicion?.peso || 0,
      imcInicial: primeraMedicion?.imc || 0,
      diferenciaPeso: ultimaMedicion && primeraMedicion 
        ? (ultimaMedicion.peso - primeraMedicion.peso).toFixed(1)
        : 0,
      promedioIMC: (imcs.reduce((a, b) => a + b, 0) / imcs.length).toFixed(1),
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

  // Obtener color de fondo según IMC
  const getBgColorIMC = (imc) => {
    if (imc < 18.5) return "from-blue-900/20 to-blue-900/10";
    if (imc < 25) return "from-green-900/20 to-emerald-900/10";
    if (imc < 30) return "from-yellow-900/20 to-amber-900/10";
    return "from-red-900/20 to-rose-900/10";
  };

  // Formatear fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Cargando mediciones...</p>
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
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Mis Mediciones
              </h1>
              <p className="text-gray-400 text-sm">
                Seguimiento de tu progreso físico
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas principales */}
        {estadisticas && mediciones.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { 
                label: "Peso actual", 
                value: `${estadisticas.pesoActual} kg`, 
                color: "text-blue-400", 
                icon: "⚖️", 
                bg: "from-blue-900/30 to-cyan-900/10",
                cambio: estadisticas.diferenciaPeso !== 0 && (
                  <span className={`text-xs ${parseFloat(estadisticas.diferenciaPeso) > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {parseFloat(estadisticas.diferenciaPeso) > 0 ? '↗' : '↘'} {Math.abs(parseFloat(estadisticas.diferenciaPeso))} kg
                  </span>
                )
              },
              { 
                label: "IMC actual", 
                value: estadisticas.imcActual, 
                color: getColorIMC(estadisticas.imcActual), 
                icon: "📈", 
                bg: getBgColorIMC(estadisticas.imcActual),
                subtext: getClasificacionIMC(estadisticas.imcActual)
              },
              { 
                label: "Total mediciones", 
                value: estadisticas.total, 
                color: "text-orange-400", 
                icon: "📋", 
                bg: "from-orange-900/30 to-amber-900/10" 
              },
              { 
                label: "IMC promedio", 
                value: estadisticas.promedioIMC, 
                color: "text-purple-400", 
                icon: "📊", 
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
                      <p className={`text-xs mt-1 ${stat.color}`}>{stat.subtext}</p>
                    )}
                    {stat.cambio && (
                      <div className="mt-1">{stat.cambio}</div>
                    )}
                  </div>
                  <span className="text-2xl opacity-80">{stat.icon}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gráfico simple de progreso (visual) */}
        {mediciones.length > 1 && (
          <div ref={chartRef} className="glass-effect rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-green-900/20 rounded-lg">
                <span className="text-green-400">📈</span>
              </div>
              <h3 className="font-bold text-green-400">Progreso de peso</h3>
            </div>
            
            <div className="h-32 flex items-end gap-2">
              {mediciones.slice(-6).map((m, index) => {
                const maxPeso = Math.max(...mediciones.map(m => m.peso));
                const minPeso = Math.min(...mediciones.map(m => m.peso));
                const altura = ((m.peso - minPeso) / (maxPeso - minPeso)) * 80 + 20;
                
                return (
                  <div key={m._id} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-lg ${
                        index === mediciones.slice(-6).length - 1 
                          ? 'bg-gradient-to-t from-orange-500 to-orange-600' 
                          : 'bg-gradient-to-t from-gray-700 to-gray-600'
                      }`}
                      style={{ height: `${altura}%` }}
                    />
                    <div className="text-center mt-2">
                      <p className="text-xs text-gray-400">{m.peso}kg</p>
                      <p className="text-xs text-gray-500">
                        {new Date(m.fecha).toLocaleDateString('es-ES', { 
                          day: 'numeric',
                          month: 'short' 
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800/50">
              <div className="text-sm text-gray-400">
                {mediciones.length > 0 && (
                  <>
                    <span className="text-green-400">Inicio:</span> {mediciones[0].peso} kg
                  </>
                )}
              </div>
              <div className="text-sm text-gray-400">
                {mediciones.length > 0 && (
                  <>
                    <span className="text-orange-400">Actual:</span> {mediciones[mediciones.length - 1].peso} kg
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Historial de mediciones */}
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-400">
                  Historial completo
                </h2>
                <p className="text-gray-400 text-sm">
                  {mediciones.length} mediciones registradas
                </p>
              </div>
            </div>
            {mediciones.length > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-400">
                  Última: {formatearFecha(mediciones[mediciones.length - 1].fecha)}
                </p>
              </div>
            )}
          </div>

          {mediciones.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl">
              <div className="text-5xl mb-4 opacity-50">📊</div>
              <p className="text-gray-400 text-lg">No hay mediciones registradas</p>
              <p className="text-gray-500 text-sm mt-2">
                Tu entrenador registrará tus mediciones próximamente
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {mediciones.slice().reverse().map((m, index) => (
                <div
                  key={m._id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group bg-gradient-to-br from-gray-900/80 to-black/50 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${getBgColorIMC(m.imc)}`}>
                          <span className={`text-lg ${getColorIMC(m.imc)}`}>📅</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white group-hover:text-orange-300 transition-colors">
                            {formatearFecha(m.fecha)}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {new Date(m.fecha).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-lg text-center ${getBgColorIMC(m.imc)}`}>
                      <p className={`text-sm font-semibold ${getColorIMC(m.imc)}`}>
                        {getClasificacionIMC(m.imc)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-blue-400">⚖️</span>
                        <p className="text-xs text-gray-400">Peso</p>
                      </div>
                      <p className="font-bold text-2xl text-blue-300">{m.peso} kg</p>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-900/30 rounded-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-purple-400">📏</span>
                        <p className="text-xs text-gray-400">Altura</p>
                      </div>
                      <p className="font-bold text-2xl text-purple-300">{m.altura} cm</p>
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/30">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className={`${getColorIMC(m.imc)}`}>📈</span>
                        <p className="text-xs text-gray-400">IMC</p>
                      </div>
                      <p className={`font-bold text-3xl ${getColorIMC(m.imc)}`}>{m.imc}</p>
                    </div>
                  </div>

                  {m.notas && (
                    <div className="mt-4 pt-4 border-t border-gray-800/50">
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-gray-800 rounded-lg mt-1">
                          <span className="text-gray-400 text-sm">📝</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 mb-2">Observaciones del entrenador:</p>
                          <p className="text-sm text-gray-300 leading-relaxed">{m.notas}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MisMediciones;