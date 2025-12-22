// components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900/80 backdrop-blur-md text-white fixed w-full z-50 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-lg">G</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              IRON GYM
            </span>
          </div>

          {/* Menú de navegación */}
          <div className="hidden md:flex space-x-8">
            {['Inicio', 'Servicios', 'Horarios', 'Planes', 'Ubicación'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-orange-400 transition duration-300 font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Botones */}
          <div className="flex space-x-4">
            <button className="px-6 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition duration-300 font-medium">
              Iniciar Sesión
            </button>
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:from-red-600 hover:to-orange-600 transition duration-300 shadow-lg">
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;