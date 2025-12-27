import React, { useState, useEffect, useRef } from "react";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import "./navbar.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navbarRef = useRef(null);

  const roleMenus = {
    ADMIN: [
      { label: "Panel", path: "/admin" },
    ],

    ENTRENADOR: [{ label: "Panel", path: "/entrenador" }],

    CLIENTE: [{ label: "Mi Perfil", path: "/perfil" }],
  };

  // Controlar el scroll para cambiar el estilo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        !e.target.closest(".navbar-container") &&
        !e.target.closest(".mobile-menu-container")
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuOpen]);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Controlar el scroll cuando los modales están abiertos
  useEffect(() => {
    if (isLoginOpen || isRegisterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoginOpen, isRegisterOpen]);

  // Funciones para abrir/cerrar modales
  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsMenuOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsMenuOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setTimeout(() => setIsLoginOpen(true), 300);
  };

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setTimeout(() => setIsRegisterOpen(true), 300);
  };

  const location = useLocation();

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // tiempo para que Home se renderice
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMenuOpen(false);
  };

  const menuItems = ["Inicio", "Servicios", "Horarios", "Planes", "Ubicación"];

  return (
    <>
      <nav
        ref={navbarRef}
        className={`navbar-container fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-700"
            : "bg-gradient-to-b from-gray-900/90 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <span className="font-bold text-base sm:text-lg">G</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                IRON GYM
              </span>
            </div>

            {/* Menú de navegación para desktop */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {menuItems.map((item) => {
                const id = item
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className="text-sm lg:text-base text-white hover:text-orange-400 transition duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                );
              })}
            </div>

            {/* Botones desktop */}
            <div className="hidden md:flex space-x-3 lg:space-x-4 items-center">
              {user ? (
                <>
                  {/* Nombre del usuario */}
                  <span className="text-sm lg:text-base text-gray-300">
                    Hola,{" "}
                    <span className="text-orange-400 font-semibold">
                      {user.nombre}
                    </span>
                  </span>

                  {/* Accesos por rol */}
                  {roleMenus[user.rol]?.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className="text-sm lg:text-base text-white hover:text-orange-400 transition duration-300 font-medium relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ))}

                  {/* Logout */}
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="px-4 py-1.5 lg:px-6 lg:py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-300 font-medium text-sm lg:text-base"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={openLoginModal}
                    className="px-4 py-1.5 lg:px-6 lg:py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 font-medium text-sm lg:text-base"
                  >
                    Iniciar Sesión
                  </button>

                  <button
                    onClick={openRegisterModal}
                    className="px-4 py-1.5 lg:px-6 lg:py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition duration-300 shadow-lg text-sm lg:text-base relative overflow-hidden group"
                  >
                    <span className="relative z-10">Registrarse</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  </button>
                </>
              )}
            </div>

            {/* Botón hamburguesa para móvil */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Botón Registrarse en móvil */}
              {!user && (
                <button
                  onClick={openRegisterModal}
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold transition text-sm"
                >
                  Regístrate
                </button>
              )}

              {/* Hamburger Menu Button from Uiverse.io */}
              <input
                id="menu-toggle"
                type="checkbox"
                className="hidden"
                checked={isMenuOpen}
                onChange={() => setIsMenuOpen(!isMenuOpen)}
              />
              <label
                htmlFor="menu-toggle"
                className="toggle cursor-pointer relative w-10 h-10 flex flex-col items-center justify-center gap-2 transition-duration-500"
              >
                <div
                  id="bar1"
                  className="bars w-6 h-0.5 bg-orange-400 rounded-full transition-all duration-300"
                ></div>
                <div
                  id="bar2"
                  className="bars w-5 h-0.5 bg-orange-400 rounded-full transition-all duration-800"
                ></div>
                <div
                  id="bar3"
                  className="bars w-6 h-0.5 bg-orange-400 rounded-full transition-all duration-300"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil desplegable - SEPARADO del Navbar */}
      <div
        className={`mobile-menu-container md:hidden fixed inset-0 z-40 transform transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Fondo oscuro semitransparente */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Contenido del menú que se desliza desde la derecha */}
        <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-gray-900/95 backdrop-blur-md shadow-2xl overflow-y-auto">
          {/* Espacio para el navbar fijo */}
          <div className="pt-16 h-full">
            {/* Menú estilo Uiverse.io */}
            <div className="input mt-6 mx-4">
              {menuItems.map((item) => (
                <button
                  key={item}
                  className="value text-sm"
                  onClick={() =>
                    scrollToSection(
                      item
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                    )
                  }
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="#F97316"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="#F97316"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="#F97316"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </button>
              ))}

              {!user ? (
                <>
                  <button className="value text-sm" onClick={openLoginModal}>
                    Iniciar Sesión
                  </button>

                  <button className="value text-sm" onClick={openRegisterModal}>
                    Registrarse
                  </button>
                </>
              ) : (
                <>
                  <div className="px-4 py-3 text-sm text-gray-300">
                    Hola,{" "}
                    <span className="text-orange-400 font-semibold">
                      {user.nombre}
                    </span>
                  </div>

                  {roleMenus[user.rol]?.map((item) => (
                    <button
                      key={item.path}
                      className="value text-sm"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate(item.path);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}

                  <button
                    className="value text-sm text-red-400"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                      navigate("/");
                    }}
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>

            {/* Información adicional del gimnasio */}
            <div className="mt-8 mx-4 p-4 bg-gray-800/50 rounded-lg">
              <h3 className="text-orange-400 font-semibold mb-3 text-sm">
                CONTACTO RÁPIDO
              </h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-xs">📞 (55) 1234-5678</p>
                <p className="text-gray-300 text-xs">
                  📍 Av. Fitness #789, Ciudad Deportiva
                </p>
                <p className="text-gray-300 text-xs">🕒 Lun-Vie: 5AM - 11PM</p>
              </div>
            </div>

            {/* Botón para cerrar el menú (opcional) */}
            <div className="mt-8 mx-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800 transition duration-300 text-sm"
              >
                Cerrar Menú
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal} />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeRegisterModal}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default Navbar;
