import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { initEntrenadorAnimations, animateTabChange } from "./animations/entrenadorAnimations";
import EntrenadorLoading from "./EntrenadorLoading";

// Lazy loading para los componentes
const AsistenciasEntrenador = lazy(() => import("./AsistenciasEntrenador"));
const MedicionesEntrenador = lazy(() => import("./MedicionesEntrenador"));
const UsuariosEntrenador = lazy(() => import("./UsuariosEntrenador"));

const Entrenador = () => {
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
      initEntrenadorAnimations(containerRef, tabsRef, contentRef);
    }
  }, []);

  const tabs = [
    { id: "asistencias", label: "Asistencias"},
    { id: "mediciones", label: "Mediciones"},
    { id: "usuarios", label: "Usuarios"},
  ];

  const renderContent = () => {
    switch (tab) {
      case "asistencias":
        return <AsistenciasEntrenador />;
      case "mediciones":
        return <MedicionesEntrenador />;
      case "usuarios":
        return <UsuariosEntrenador />;
      default:
        return <AsistenciasEntrenador />;
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 md:p-6 pt-24 md:pt-28">
        {/* Header con efecto de vidrio */}
        <div className="glass-effect rounded-2xl p-4 md:p-6 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
            Panel Entrenador
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Gestiona asistencias, mediciones y usuarios asignados
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
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-lg shadow-orange-500/30"
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
          <Suspense fallback={<EntrenadorLoading />}>
            {renderContent()}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Entrenador;