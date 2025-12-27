import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { initMedicionesEntrenadorAnimations } from "./animations/medicionesAnimations";

const MedicionesEntrenador = () => {
  const [mediciones, setMediciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [form, setForm] = useState({
    peso: "",
    altura: "",
    notas: "",
  });

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef([]);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      const { data } = await api.get("/usuarios");
      setUsuarios(data);
    };
    cargarUsuarios();
  }, []);

  useEffect(() => {
    const fetchMediciones = async () => {
      try {
        const { data } = await api.get("/mediciones");
        setMediciones(data);
      } catch (error) {
        console.error("Error cargando mediciones", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediciones();

    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initMedicionesEntrenadorAnimations(containerRef, cardsRef, formRef, inputsRef, buttonRef);
      }
    }, 100);
  }, []);

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
      const { data } = await api.get("/mediciones");
      setMediciones(data);
      
      alert("Medición registrada exitosamente");
    } catch (error) {
      console.error("Error registrando medición", error);
      alert("Error al registrar la medición");
    }
  };

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
                Gestión de Mediciones
              </h1>
              <p className="text-gray-400 text-sm">
                Registra y consulta mediciones físicas de usuarios
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna 1: Formulario */}
          <div ref={formRef} className="glass-effect rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-lg">
                <span className="text-2xl">➕</span>
              </div>
              <h2 className="text-xl font-bold text-green-400">
                Nueva Medición
              </h2>
            </div>

            <form onSubmit={guardarMedicion} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Seleccionar usuario
                </label>
                <select
                  ref={(el) => (inputsRef.current[0] = el)}
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  value={usuarioId}
                  onChange={(e) => setUsuarioId(e.target.value)}
                  required
                >
                  <option value="" className="text-gray-500">Seleccionar usuario</option>
                  {usuarios.map((u) => (
                    <option key={u._id} value={u._id}>
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
                    ref={(el) => (inputsRef.current[1] = el)}
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
                    ref={(el) => (inputsRef.current[2] = el)}
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
                  ref={(el) => (inputsRef.current[3] = el)}
                  placeholder="Notas adicionales sobre la medición..."
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 resize-none"
                  value={form.notas}
                  onChange={(e) => setForm({ ...form, notas: e.target.value })}
                  rows="3"
                />
              </div>

              <button
                ref={buttonRef}
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-[1.02]"
              >
                Guardar Medición
              </button>
            </form>
          </div>

          {/* Columna 2: Historial */}
          <div className="space-y-4">
            <div className="glass-effect rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-lg">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-400">
                      Historial de Mediciones
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {mediciones.length} registros totales
                    </p>
                  </div>
                </div>
              </div>

              {mediciones.length === 0 ? (
                <div className="text-center py-8 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl">
                  <div className="text-5xl mb-3 opacity-50">📊</div>
                  <p className="text-gray-400">No hay mediciones registradas</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Comienza registrando tu primera medición
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {mediciones.map((m, index) => (
                    <div
                      key={m._id}
                      ref={(el) => (cardsRef.current[index] = el)}
                      className="group bg-gradient-to-br from-gray-900/80 to-black/50 p-4 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-lg text-white group-hover:text-orange-300 transition-colors">
                            {m.usuario_id?.nombre || "Usuario eliminado"}
                          </p>
                          <p className="text-sm text-gray-400">
                            {new Date(m.fecha).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          getColorIMC(m.imc).replace('text-', 'bg-').replace('400', '900/30')
                        } ${getColorIMC(m.imc)}`}>
                          {getClasificacionIMC(m.imc)}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="bg-gray-900/30 p-3 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Peso</p>
                            <p className="font-bold text-lg text-blue-300">{m.peso} kg</p>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="bg-gray-900/30 p-3 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Altura</p>
                            <p className="font-bold text-lg text-purple-300">{m.altura} cm</p>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className={`p-3 rounded-lg ${getColorIMC(m.imc).replace('text-', 'bg-').replace('400', '900/20')}`}>
                            <p className="text-xs text-gray-400 mb-1">IMC</p>
                            <p className={`font-bold text-2xl ${getColorIMC(m.imc)}`}>{m.imc}</p>
                          </div>
                        </div>
                      </div>

                      {m.notas && (
                        <div className="mt-3 pt-3 border-t border-gray-800/50">
                          <p className="text-xs text-gray-400 mb-1">Observaciones:</p>
                          <p className="text-sm text-gray-300">{m.notas}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Estadísticas rápidas */}
            {mediciones.length > 0 && (
              <div className="glass-effect rounded-2xl p-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-400">{mediciones.length}</p>
                    <p className="text-xs text-gray-400">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">
                      {Math.round(mediciones.reduce((acc, m) => acc + parseFloat(m.peso), 0) / mediciones.length)}
                    </p>
                    <p className="text-xs text-gray-400">Peso avg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">
                      {Math.round(mediciones.reduce((acc, m) => acc + parseFloat(m.altura), 0) / mediciones.length)}
                    </p>
                    <p className="text-xs text-gray-400">Altura avg</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicionesEntrenador;