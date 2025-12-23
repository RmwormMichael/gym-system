// components/modals/LoginModal.jsx
import React, { useState } from "react";
import "./login.css";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/usuarios/login", {
        correo: formData.email,
        password: formData.password,
      });

      login(data.token); // 👈 ESTO es lo importante
      onClose();
      navigate("/perfil");
    } catch (error) {
      alert(error.response?.data?.msg || "Credenciales incorrectas");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div className="glitch-form-wrapper w-full max-w-md">
        <div className="relative">
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
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                  <path d="M12 11.5a3 3 0 0 0 -3 2.824v1.176a3 3 0 0 0 6 0v-1.176a3 3 0 0 0 -3 -2.824z"></path>
                </svg>
                <span>IRON GYM ACCESS</span>
              </div>

              {/* Quitamos los card-dots con los dos botones */}
            </div>

            <div className="card-body">
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
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                />
                <label
                  htmlFor="password"
                  className="form-label"
                  data-text="PASSWORD"
                >
                  PASSWORD
                </label>
              </div>

              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-400">Recordarme</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-orange-300 hover:text-orange-200"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button
                data-text="INICIAR SESIÓN"
                type="submit"
                className="submit-btn"
              >
                <span className="btn-text">INICIAR SESIÓN</span>
              </button>

              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  ¿No tienes cuenta?{" "}
                  <button
                    type="button"
                    className="text-orange-300 hover:text-orange-200 font-semibold"
                    onClick={() => {
                      onClose();
                      // Aquí podrías abrir el modal de registro
                    }}
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </div>
          </form>

          {/* Botón de cerrar con nuevos estilos */}
          <button
            onClick={onClose}
            className="close-btn"
            aria-label="Cerrar modal"
          >
            <svg
              className="close-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
