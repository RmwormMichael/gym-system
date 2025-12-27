import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { initMisContactosAnimations } from "./animations/misContactosAnimations";

const MisContactos = () => {
  const { user } = useAuth();
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    parentesco: "",
  });

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const cardsRef = useRef([]);
  const inputsRef = useRef([]);
  const buttonRef = useRef(null);

  const cargarContactos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/contactos/usuario/${user.uid}`);
      setContactos(data);
    } catch (error) {
      console.error("Error cargando contactos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarContactos();

    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initMisContactosAnimations(containerRef, cardsRef, formRef, inputsRef, buttonRef);
      }
    }, 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!form.nombre || !form.telefono || !form.parentesco) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await api.post("/contactos", {
        ...form,
        usuario_id: user.uid,
      });

      // Limpiar formulario
      setForm({ nombre: "", telefono: "", parentesco: "" });
      
      // Recargar contactos
      await cargarContactos();
      
      alert("¡Contacto guardado exitosamente!");
    } catch (error) {
      console.error("Error guardando contacto:", error);
      alert("Error al guardar el contacto");
    }
  };

  // Opciones de parentesco
  const opcionesParentesco = [
    { value: "Padre", label: "👨 Padre", icon: "👨" },
    { value: "Madre", label: "👩 Madre", icon: "👩" },
    { value: "Hermano/a", label: "👫 Hermano/a", icon: "👫" },
    { value: "Esposo/a", label: "💑 Esposo/a", icon: "💑" },
    { value: "Hijo/a", label: "👶 Hijo/a", icon: "👶" },
    { value: "Tío/a", label: "🧔 Tío/a", icon: "🧔" },
    { value: "Primo/a", label: "👤 Primo/a", icon: "👤" },
    { value: "Amigo/a", label: "👥 Amigo/a", icon: "👥" },
    { value: "Otro", label: "❓ Otro", icon: "❓" },
  ];

  // Obtener icono según parentesco
  const getIconoParentesco = (parentesco) => {
    const opcion = opcionesParentesco.find(op => op.value === parentesco);
    return opcion ? opcion.icon : "👤";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Cargando contactos...</p>
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
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Mis Contactos Familiares
              </h1>
              <p className="text-gray-400 text-sm">
                Personas de confianza en caso de emergencia
              </p>
            </div>
          </div>
        </div>

        {/* Formulario para agregar contacto */}
        <div ref={formRef} className="glass-effect rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-lg">
              <span className="text-2xl">➕</span>
            </div>
            <h2 className="text-xl font-bold text-green-400">
              Agregar Nuevo Contacto
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre completo
                </label>
                <input
                  ref={(el) => (inputsRef.current[0] = el)}
                  placeholder="Ej: María González"
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono
                </label>
                <input
                  ref={(el) => (inputsRef.current[1] = el)}
                  placeholder="Ej: 3001234567"
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Parentesco
                </label>
                <select
                  ref={(el) => (inputsRef.current[2] = el)}
                  className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 appearance-none"
                  value={form.parentesco}
                  onChange={(e) => setForm({ ...form, parentesco: e.target.value })}
                  required
                >
                  <option value="" className="text-gray-500">
                    Seleccione un parentesco
                  </option>
                  {opcionesParentesco.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                      {opcion.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-gray-400">▼</span>
                </div>
              </div>
            </div>

            <button
              ref={buttonRef}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25 transform hover:scale-[1.02]"
            >
              Guardar Contacto
            </button>
          </form>
        </div>

        {/* Lista de contactos */}
        <div className="glass-effect rounded-2xl p-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-lg">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-400">
                  Mis Contactos
                </h2>
                <p className="text-gray-400 text-sm">
                  {contactos.length} contactos registrados
                </p>
              </div>
            </div>
            {contactos.length > 0 && (
              <div className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-sm font-semibold">
                {contactos.length} {contactos.length === 1 ? 'contacto' : 'contactos'}
              </div>
            )}
          </div>

          {contactos.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl">
              <div className="text-5xl mb-4 opacity-50">📇</div>
              <p className="text-gray-400 text-lg">No tienes contactos registrados</p>
              <p className="text-gray-500 text-sm mt-2">
                Agrega contactos de confianza para emergencias
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactos.map((c, index) => (
                <div
                  key={c._id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group bg-gradient-to-br from-gray-900/80 to-black/50 p-5 rounded-xl border border-gray-700/50 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl">
                      <span className="text-2xl">
                        {getIconoParentesco(c.parentesco)}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-white group-hover:text-orange-300 transition-colors">
                            {c.nombre}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                              {c.parentesco}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(c.createdAt || c.fecha_creacion).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg">
                          <div className="p-2 bg-green-900/20 rounded-lg">
                            <span className="text-green-400">📱</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-400">Teléfono</p>
                            <p className="font-medium text-white">{c.telefono}</p>
                          </div>
                          <button
                            onClick={() => window.open(`tel:${c.telefono}`)}
                            className="p-2 bg-blue-900/30 hover:bg-blue-800/40 rounded-lg transition-colors"
                          >
                            <span className="text-blue-400">📞</span>
                          </button>
                        </div>

                        {c.direccion && (
                          <div className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-lg">
                            <div className="p-2 bg-purple-900/20 rounded-lg">
                              <span className="text-purple-400">🏠</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-400">Dirección</p>
                              <p className="text-sm text-gray-300">{c.direccion}</p>
                            </div>
                          </div>
                        )}

                        {c.notas && (
                          <div className="p-3 bg-gray-900/30 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Notas</p>
                            <p className="text-sm text-gray-300">{c.notas}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información de emergencia */}
        <div className="glass-effect rounded-2xl p-5 mt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-red-900/20 rounded-lg">
              <span className="text-red-400">⚠️</span>
            </div>
            <h3 className="font-bold text-red-400">Información importante</h3>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Estos contactos serán notificados en caso de emergencia médica</p>
            <p>• Mantén la información actualizada y verifica los números telefónicos</p>
            <p>• Recomendamos incluir al menos 2 contactos de confianza</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisContactos;