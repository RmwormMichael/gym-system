// components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navbarRef = useRef(null);

  // Controlar el scroll para cambiar el estilo
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && 
          !e.target.closest('.navbar-container') && 
          !e.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Controlar el scroll cuando los modales están abiertos
  useEffect(() => {
    if (isLoginOpen || isRegisterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
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

  const menuItems = ['Inicio', 'Servicios', 'Horarios', 'Planes', 'Ubicación'];

  return (
    <>
      <nav 
        ref={navbarRef}
        className={`navbar-container fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700' 
            : 'bg-gradient-to-b from-gray-900/90 to-transparent'
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
              {menuItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm lg:text-base text-white hover:text-orange-400 transition duration-300 font-medium relative group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Botones desktop */}
            <div className="hidden md:flex space-x-3 lg:space-x-4">
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
            </div>

            {/* Botón hamburguesa para móvil */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Botón Registrarse en móvil */}
              <button 
                onClick={openRegisterModal}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition duration-300 shadow text-sm relative overflow-hidden group"
              >
                <span className="relative z-10">Regístrate</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
              
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
                <div id="bar1" className="bars w-6 h-0.5 bg-orange-400 rounded-full transition-all duration-300"></div>
                <div id="bar2" className="bars w-5 h-0.5 bg-orange-400 rounded-full transition-all duration-800"></div>
                <div id="bar3" className="bars w-6 h-0.5 bg-orange-400 rounded-full transition-all duration-300"></div>
              </label>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil desplegable - SEPARADO del Navbar */}
      <div 
        className={`mobile-menu-container md:hidden fixed inset-0 z-40 transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'translate-x-0 opacity-100' 
            : 'translate-x-full opacity-0 pointer-events-none'
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
              {menuItems.map((item, index) => (
                <button
                  key={item}
                  className="value text-sm"
                  onClick={() => {
                    handleLinkClick();
                    document.getElementById(`${item.toLowerCase()}`)?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {item}
                </button>
              ))}
              
              <button 
                className="value text-sm"
                onClick={openLoginModal}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C18.1 17.3 15.3 19 12 19C8.7 19 5.9 17.3 4.6 15C4.6 15 7.1 12 12 12C16.9 12 19.4 15 19.4 15Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Iniciar Sesión
              </button>
              
              <button 
                className="value text-sm"
                onClick={openRegisterModal}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Registrarse
              </button>
            </div>

            {/* Información adicional del gimnasio */}
            <div className="mt-8 mx-4 p-4 bg-gray-800/50 rounded-lg">
              <h3 className="text-orange-400 font-semibold mb-3 text-sm">CONTACTO RÁPIDO</h3>
              <div className="space-y-2">
                <p className="text-gray-300 text-xs">📞 (55) 1234-5678</p>
                <p className="text-gray-300 text-xs">📍 Av. Fitness #789, Ciudad Deportiva</p>
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
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={closeLoginModal}
      />
      
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={closeRegisterModal}
        onSwitchToLogin={switchToLogin}
      />

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        #menu-toggle:checked + .toggle .bars {
          position: absolute;
          transition-duration: .5s;
        }
        
        #menu-toggle:checked + .toggle #bar2 {
          transform: scaleX(0);
          transition-duration: .1s;
          opacity: 0;
        }
        
        #menu-toggle:checked + .toggle #bar1 {
          width: 100%;
          transform: rotate(45deg);
          transition-duration: .5s;
        }
        
        #menu-toggle:checked + .toggle #bar3 {
          width: 100%;
          transform: rotate(-45deg);
          transition-duration: .5s;
        }
        
        #menu-toggle:checked + .toggle {
          transition-duration: .5s;
          transform: rotate(180deg);
        }
        
        /* Estilos para el menú Uiverse.io */
        .input {
          display: flex;
          flex-direction: column;
          width: 100%;
          background-color: rgba(17, 24, 39, 0.95);
          justify-content: center;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .value {
          background-color: transparent;
          border: none;
          padding: 12px 16px;
          color: white;
          display: flex;
          align-items: center;
          position: relative;
          gap: 10px;
          cursor: pointer;
          border-radius: 0;
          transition: all 0.3s ease;
          font-size: 14px;
        }
        
        .value:not(:active):hover,
        .value:focus {
          background-color: rgba(33, 38, 44, 0.8);
        }
        
        .value:focus,
        .value:active {
          background-color: rgba(26, 31, 36, 0.9);
          outline: none;
        }
        
        .value::before {
          content: "";
          position: absolute;
          top: 10px;
          left: 0;
          width: 4px;
          height: 60%;
          background-color: #F97316;
          border-radius: 5px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .value:focus::before,
        .value:active::before {
          opacity: 1;
        }
        
        .value svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }
        
        .input:hover > :not(.value:hover) {
          transition: 300ms;
          filter: blur(1px);
          transform: scale(0.95,0.95);
        }
        
        /* Animación del botón Registrarse */
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
          }
        }
        
        .group:hover .relative {
          animation: pulse 2s infinite;
        }
        
        /* Transición suave para el menú móvil */
        .mobile-menu-container {
          transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
        }
        
        /* Asegurar que el z-index sea correcto */
        .mobile-menu-container {
          z-index: 40;
        }
        
        .navbar-container {
          z-index: 50;
        }
        
        /* Mejorar el scroll en el menú móvil */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </>
  );
};

export default Navbar;