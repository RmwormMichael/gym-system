import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { initAdminAnimations, animateTabChange } from "./animations/adminAnimations";
import AdminLoading from "./AdminLoading";

// Lazy loading para los componentes
const AdminAsistencias = lazy(() => import("./AdminAsistencias"));
const AdminMediciones = lazy(() => import("./AdminMediciones"));
const AdminUsuarios = lazy(() => import("./AdminUsuarios"));
const AdminPlanes = lazy(() => import("./AdminPlanes"));

const Admin = () => {
  const [tab, setTab] = useState("asistencias");
  const [isChangingTab, setIsChangingTab] = useState(false);
  const containerRef = useRef(null);
  const tabsRef = useRef([]);
  const contentRef = useRef(null);

  const handleTabChange = (newTab) => {
    if (newTab === tab || isChangingTab) return;
    
    setIsChangingTab(true);
    
    // Animar salida del contenido actual
    animateTabChange(contentRef, () => {
      setTab(newTab);
      // Deshabilitar el flag después de que la animación termine
      setTimeout(() => setIsChangingTab(false), 400);
    });
  };

  useEffect(() => {
    // Solo animar la entrada inicial
    if (containerRef.current && contentRef.current) {
      initAdminAnimations(containerRef, tabsRef, contentRef);
    }
  }, []);

  const tabs = [
    { id: "asistencias", label: "Asistencias"},
    { id: "mediciones", label: "Mediciones"},
    { id: "usuarios", label: "Usuarios"},
    { id: "planes", label: "Planes"},
  ];

  const renderContent = () => {
    switch (tab) {
      case "asistencias":
        return <AdminAsistencias />;
      case "mediciones":
        return <AdminMediciones />;
      case "usuarios":
        return <AdminUsuarios />;
      case "planes":
        return <AdminPlanes />;
      default:
        return <AdminAsistencias />;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 md:p-6 pt-24 md:pt-28">
        {/* Header con efecto de vidrio */}
        <div className="glass-effect rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#00f2ea] to-[#00b3ff] bg-clip-text text-transparent mb-2">
            Panel Administrador
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Gestiona todas las operaciones del gimnasio desde un solo lugar
          </p>
        </div>

        {/* Tabs estilo moderno */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
          {tabs.map((t, index) => (
            <button
              key={t.id}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleTabChange(t.id)}
              disabled={isChangingTab}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                tab === t.id
                  ? "bg-gradient-to-r from-[#00f2ea] to-[#00b3ff] text-black shadow-lg shadow-[#00f2ea]/30"
                  : "glass-effect hover:bg-gray-800/50 text-gray-300"
              }`}
            >
              <span className="text-lg">{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.icon}</span>
            </button>
          ))}
        </div>

        {/* Contenido con animación y suspense */}
        <div ref={contentRef} className="relative min-h-[400px]">
          <Suspense fallback={<AdminLoading />}>
            {renderContent()}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Admin;