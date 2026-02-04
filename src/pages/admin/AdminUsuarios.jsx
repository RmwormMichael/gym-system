import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import { initUsuariosAnimations } from "./animations/usuariosAnimations";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroRol, setFiltroRol] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);

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
        initUsuariosAnimations(containerRef, statsRef, cardsRef);
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
    
    const cumpleRol = filtroRol === "todos" || u.rol === filtroRol;
    
    const cumpleBusqueda = !busqueda || 
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.cedula.includes(busqueda) ||
      u.correo.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleEstado && cumpleRol && cumpleBusqueda;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00f2ea] mb-4"></div>
          <p className="text-gray-400">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00f2ea] to-[#00b3ff] bg-clip-text text-transparent">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Administra la información de todos los usuarios del sistema
          </p>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="glass-effect rounded-2xl p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Búsqueda */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre, cédula o correo..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-[#00f2ea] focus:ring-1 focus:ring-[#00f2ea] focus:outline-none transition-all duration-200"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3">
            <select
              className="px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-[#00f2ea] focus:ring-1 focus:ring-[#00f2ea] focus:outline-none transition-all duration-200 text-sm"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="todos">Todos los estados</option>
              <option value="activos">Solo activos</option>
              <option value="inactivos">Solo inactivos</option>
            </select>

            <select
              className="px-4 py-2.5 rounded-xl bg-gray-900/50 border border-gray-700 focus:border-[#00f2ea] focus:ring-1 focus:ring-[#00f2ea] focus:outline-none transition-all duration-200 text-sm"
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
            >
              <option value="todos">Todos los roles</option>
              <option value="cliente">Clientes</option>
              <option value="entrenador">Entrenadores</option>
              <option value="admin">Administradores</option>
            </select>

            <button
              onClick={() => {
                setFiltroEstado("todos");
                setFiltroRol("todos");
                setBusqueda("");
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl text-sm font-medium transition-all duration-300 shadow hover:shadow-lg"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios
          </p>
        </div>
      </div>

      {/* Lista de usuarios */}
      {usuariosFiltrados.length === 0 ? (
        <div className="text-center py-12 glass-effect rounded-2xl">
          <div className="text-5xl mb-4 opacity-50">👤</div>
          <p className="text-gray-400 text-lg">No se encontraron usuarios</p>
          <p className="text-gray-500 text-sm mt-2">Intenta cambiar los filtros de búsqueda</p>
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
                className="group glass-effect rounded-2xl p-5 hover:border-[#00f2ea]/30 transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Información del usuario */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          u.rol === "admin" ? "bg-yellow-900/20" :
                          u.rol === "entrenador" ? "bg-purple-900/20" :
                          "bg-blue-900/20"
                        }`}>
                          <span className={`text-lg ${
                            u.rol === "admin" ? "text-yellow-400" :
                            u.rol === "entrenador" ? "text-purple-400" :
                            "text-blue-400"
                          }`}>
                            {u.rol === "admin" ? "👑" : u.rol === "entrenador" ? "🏋️" : "👤"}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white group-hover:text-[#00f2ea] transition-colors">
                            {u.nombre}
                          </h3>
                          <p className="text-sm text-gray-400">CC: {u.cedula}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.estado 
                          ? "bg-green-900/40 text-green-300 border border-green-700/30" 
                          : "bg-red-900/40 text-red-300 border border-red-700/30"
                      }`}>
                        {u.estado ? "Activo" : "Inactivo"}
                      </div>
                    </div>

                    <div className="space-y-2 pl-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">📧</span>
                        <p className="text-sm text-gray-300">{u.correo}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">📞</span>
                        <p className="text-sm text-gray-300">
                          {u.telefono || "No registrado"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Plan */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-[#00f2ea]/20 rounded-lg">
                        <span className="text-[#00f2ea]">📋</span>
                      </div>
                      <h4 className="font-semibold text-[#00f2ea]">Plan</h4>
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
  );
};

export default AdminUsuarios;