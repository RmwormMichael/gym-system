// components/Navbar.jsx
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      if (isMenuOpen && !e.target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = ['Inicio', 'Servicios', 'Horarios', 'Planes', 'Ubicación'];

  return (
    <nav className={`navbar-container fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700' 
        : 'bg-gradient-to-b from-gray-900/90 to-transparent'
    }`}>
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
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Botones desktop */}
          <div className="hidden md:flex space-x-3 lg:space-x-4">
            <button className="px-4 py-1.5 lg:px-6 lg:py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 font-medium text-sm lg:text-base">
              Iniciar Sesión
            </button>
            <button className="px-4 py-1.5 lg:px-6 lg:py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition duration-300 shadow-lg text-sm lg:text-base relative overflow-hidden group">
              <span className="relative z-10">Registrarse</span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </button>
          </div>

          {/* Botón hamburguesa para móvil */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Botón Registrarse en móvil */}
            <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition duration-300 shadow text-sm relative overflow-hidden group">
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

        {/* Menú móvil desplegable */}
        <div className={`md:hidden fixed inset-0 top-16 bg-gray-900/95 backdrop-blur-md transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}>
          <div className="h-full overflow-y-auto pb-20">
            {/* Menú estilo Uiverse.io */}
            <div className="input mt-6 mx-4">
              {menuItems.map((item, index) => (
                <button
                  key={item}
                  className="value text-sm"
                  onClick={() => {
                    handleLinkClick();
                    document.getElementById(`${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' });
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
              
              <button className="value text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C18.1 17.3 15.3 19 12 19C8.7 19 5.9 17.3 4.6 15C4.6 15 7.1 12 12 12C16.9 12 19.4 15 19.4 15Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Iniciar Sesión
              </button>
              
              <button className="value text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Registrarse
              </button>
              
              <button className="value text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12L15 15" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Horarios
              </button>
              
              <button className="value text-sm" >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ubicación
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
          </div>
        </div>
      </div>

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
        .fixed {
          transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;