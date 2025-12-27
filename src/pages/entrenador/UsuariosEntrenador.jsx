import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { initUsuariosEntrenadorAnimations } from "./animations/usuariosAnimations";

const UsuariosEntrenador = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("activos");

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usuariosRes, planesRes, contactosRes] = await Promise.all([
          api.get("/usuarios"),
          api.get("/planes?estado=true"),
          api.get("/contactos"),
        ]);

        setUsuarios(usuariosRes.data);
        setPlanes(planesRes.data);
        setContactos(contactosRes.data);
      } catch (error) {
        console.error("Error cargando usuarios", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Inicializar animaciones
    setTimeout(() => {
      if (containerRef.current) {
        initUsuariosEntrenadorAnimations(containerRef, cardsRef, statsRef, searchRef);
      }
    }, 100);
  }, []);

  const obtenerPlan = (planId) => planes.find((p) => p._id === planId);
  const obtenerContacto = (usuarioId) => contactos.find((c) => c.usuario_id?._id === usuarioId);

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter((u) => {
    const cumpleEstado = filtroEstado === "todos" || 
      (filtroEstado === "activos" && u.estado) || 
      (filtroEstado === "inactivos" && !u.estado);
    
    const cumpleBusqueda = !busqueda || 
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.cedula.includes(busqueda) ||
      u.telefono?.includes(busqueda);
    
    return cumpleEstado && cumpleBusqueda;
  });


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Cargando usuarios...</p>
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
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Gestión de Usuarios
              </h1>
              <p className="text-gray-400 text-sm">
                Consulta información de los usuarios asignados
              </p>
            </div>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="glass-effect rounded-2xl p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Buscar por nombre, cédula o teléfono..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Filtro estado */}
            <div className="flex gap-2">
              <button
                onClick={() => setFiltroEstado("activos")}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  filtroEstado === "activos"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                    : "bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                }`}
              >
                Activos
              </button>
              <button
                onClick={() => setFiltroEstado("inactivos")}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  filtroEstado === "inactivos"
                    ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg"
                    : "bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                }`}
              >
                Inactivos
              </button>
              <button
                onClick={() => setFiltroEstado("todos")}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  filtroEstado === "todos"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
                    : "bg-gray-900/50 text-gray-300 hover:bg-gray-800/50"
                }`}
              >
                Todos
              </button>
            </div>
          </div>

          {/* Contador resultados */}
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
            </p>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                filtroEstado === "activos" ? "bg-green-900/40 text-green-300" :
                filtroEstado === "inactivos" ? "bg-red-900/40 text-red-300" :
                "bg-blue-900/40 text-blue-300"
              }`}>
                {filtroEstado === "todos" ? "Todos" : filtroEstado === "activos" ? "Activos" : "Inactivos"}
              </span>
              {busqueda && (
                <span className="px-3 py-1 bg-orange-900/40 text-orange-300 rounded-full text-xs font-semibold">
                  Búsqueda activa
                </span>
              )}
            </div>
          </div>
        </div>


        {/* Lista de usuarios */}
        {usuariosFiltrados.length === 0 ? (
          <div className="text-center py-12 glass-effect rounded-2xl">
            <div className="text-5xl mb-4 opacity-50">👤</div>
            <p className="text-gray-400 text-lg">No se encontraron usuarios</p>
            <p className="text-gray-500 text-sm mt-2">
              {busqueda 
                ? "Intenta con otros términos de búsqueda" 
                : filtroEstado !== "todos" 
                  ? "No hay usuarios con ese estado" 
                  : "No hay usuarios registrados"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {usuariosFiltrados.map((u, index) => {
              const plan = obtenerPlan(u.plan_id);
              const contacto = obtenerContacto(u._id);

              return (
                <div
                  key={u._id}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="group glass-effect rounded-2xl p-5 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Información del usuario */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            u.estado 
                              ? "bg-green-900/20 border border-green-700/30" 
                              : "bg-red-900/20 border border-red-700/30"
                          }`}>
                            <span className={`text-lg ${
                              u.estado ? "text-green-400" : "text-red-400"
                            }`}>
                              {u.estado ? "👤" : "⏸️"}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-white group-hover:text-orange-300 transition-colors">
                              {u.nombre}
                            </h3>
                            <p className="text-sm text-gray-400">CC: {u.cedula}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.estado 
                            ? "bg-green-900/40 text-green-300" 
                            : "bg-red-900/40 text-red-300"
                        }`}>
                          {u.estado ? "Activo" : "Inactivo"}
                        </span>
                      </div>

                      <div className="space-y-2 pl-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">📞</span>
                          <p className="text-sm text-gray-300">
                            {u.telefono || "No registrado"}
                          </p>
                        </div>
                        {u.correo && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">📧</span>
                            <p className="text-sm text-gray-300">{u.correo}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Plan */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-orange-900/20 rounded-lg">
                          <span className="text-orange-400">📋</span>
                        </div>
                        <h4 className="font-semibold text-orange-400">Plan</h4>
                      </div>
                      
                      {plan ? (
                        <div className="bg-gradient-to-r from-gray-900/50 to-black/30 p-3 rounded-lg border border-gray-700/50">
                          <p className="font-medium text-white">{plan.nombre_plan}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-400">
                              ${plan.precio.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-400">
                              {plan.duracion} días
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            ${Math.round(plan.precio / plan.duracion).toLocaleString()} por día
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-gray-900/50 to-black/30 p-3 rounded-lg border border-gray-700/50 text-center">
                          <p className="text-gray-500 text-sm">Sin plan asignado</p>
                        </div>
                      )}
                    </div>

                    {/* Contacto familiar */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-green-900/20 rounded-lg">
                          <span className="text-green-400">👨‍👩‍👧</span>
                        </div>
                        <h4 className="font-semibold text-green-400">Contacto familiar</h4>
                      </div>
                      
                      {contacto ? (
                        <div className="bg-gradient-to-r from-gray-900/50 to-black/30 p-3 rounded-lg border border-gray-700/50">
                          <div className="space-y-2">
                            <div>
                              <p className="font-medium text-white">{contacto.nombre}</p>
                              <p className="text-sm text-gray-400">{contacto.parentesco}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">📞</span>
                              <p className="text-sm text-gray-300">{contacto.telefono}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-gray-900/50 to-black/30 p-3 rounded-lg border border-gray-700/50 text-center">
                          <p className="text-gray-500 text-sm">Sin contacto registrado</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsuariosEntrenador;