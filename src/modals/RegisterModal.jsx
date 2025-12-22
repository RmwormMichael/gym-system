import React, { useState } from 'react';
import './register.css';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    plan: 'basico'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Register data:', formData);
    // Aquí iría la lógica de registro
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoginClick = () => {
    onClose();
    if (onSwitchToLogin) {
      setTimeout(() => onSwitchToLogin(), 300);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div className="glitch-form-wrapper w-full max-w-md relative">
        
        <form className="glitch-card" onSubmit={handleSubmit}>
          <div className="card-header">
            <div className="card-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                <path
                  d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"
                ></path>
                <path
                  d="M12 11.5a3 3 0 0 0 -3 2.824v1.176a3 3 0 0 0 6 0v-1.176a3 3 0 0 0 -3 -2.824z"
                ></path>
              </svg>
              <span>IRON GYM REGISTRO</span>
            </div>
                    {/* Botón de cerrar con nuevos estilos */}
        <button
          onClick={onClose}
          className="close-btn"
          aria-label="Cerrar modal"
        >
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
          </div>

          <div className="card-body">
            <div className="form-group">
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                placeholder=" "
                value={formData.nombre}
                onChange={handleChange}
              />
              <label htmlFor="nombre" className="form-label" data-text="NOMBRE COMPLETO">
                NOMBRE COMPLETO
              </label>
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="form-label" data-text="EMAIL">
                EMAIL
              </label>
            </div>

            <div className="form-group">
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                placeholder=" "
                value={formData.telefono}
                onChange={handleChange}
              />
              <label htmlFor="telefono" className="form-label" data-text="TELÉFONO">
                TELÉFONO
              </label>
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder=" "
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password" className="form-label" data-text="CONTRASEÑA">
                CONTRASEÑA
              </label>
            </div>

            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword" className="form-label" data-text="CONFIRMAR CONTRASEÑA">
                CONFIRMAR CONTRASEÑA
              </label>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" required className="mr-2" />
                <span className="text-sm text-gray-400">
                  Acepto los{' '}
                  <a href="#" className="text-orange-400 hover:text-orange-300">
                    términos y condiciones
                  </a>
                </span>
              </label>
            </div>

            <button data-text="CREAR CUENTA" type="submit" className="submit-btn mt-6">
              <span className="btn-text">CREAR CUENTA</span>
            </button>

            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                ¿Ya tienes cuenta?{' '}
                <button
                  type="button"
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                  onClick={handleLoginClick}
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;