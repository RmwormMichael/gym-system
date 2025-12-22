// src/components/pages/Home.jsx
import React, { useRef, useEffect } from "react";
import { initAllAnimations } from "../animations/gymAnimations";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Importa todos los datos
import {
  heroData,
  statsData,
  serviciosData,
  horariosData,
  planesData,
  contactoData,
  footerData,
} from "../data/gymData";

const Home = () => {
  // Referencias para todas las secciones
  const heroSectionRef = useRef();
  const heroTitleRef = useRef();
  const heroSubtitleRef = useRef();
  const heroButtonsRef = useRef();
  const heroStatsRef = useRef();
  const parallaxBgRef = useRef();

  const serviciosSectionRef = useRef();
  const serviciosTitleRef = useRef();
  const serviciosCardsRef = useRef([]);
  const statNumberRefs = useRef([]);

  const horariosSectionRef = useRef();
  const horariosTitleRef = useRef();
  const horariosLeftRef = useRef();
  const horariosRightRef = useRef();

  const planesSectionRef = useRef();
  const planesTitleRef = useRef();
  const planesCardsRef = useRef([]);

  const ubicacionSectionRef = useRef();
  const ubicacionTitleRef = useRef();
  const ubicacionLeftRef = useRef();
  const ubicacionRightRef = useRef();

  // Inicializar animaciones cuando el componente se monta
  useEffect(() => {
    const refs = {
      heroSectionRef,
      heroTitleRef,
      heroSubtitleRef,
      heroButtonsRef,
      heroStatsRef,
      parallaxBgRef,
      serviciosSectionRef,
      serviciosTitleRef,
      serviciosCardsRef,
      horariosSectionRef,
      horariosTitleRef,
      horariosLeftRef,
      horariosRightRef,
      planesSectionRef,
      planesTitleRef,
      planesCardsRef,
      ubicacionSectionRef,
      ubicacionTitleRef,
      ubicacionLeftRef,
      ubicacionRightRef,
      statNumberRefs,
    };

    initAllAnimations(refs);

    // Función de limpieza si es necesario
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* HERO SECTION */}
      <section
        id="inicio"
        ref={heroSectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 pt-16"
      >
        <div
          ref={parallaxBgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative z-10 text-center">
          {/* Título con span para cada palabra */}
          <h1
            ref={heroTitleRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight px-2"
          >
            <span className="title-word inline-block opacity-0">
              TRANSFORMA
            </span>{" "}
            <span className="title-word inline-block opacity-0">TU</span>{" "}
            <span className="title-word inline-block opacity-0 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              CUERPO
            </span>
          </h1>

          <p
            ref={heroSubtitleRef}
            className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-10 max-w-3xl mx-auto opacity-0 px-3"
            dangerouslySetInnerHTML={{ __html: heroData.subtitle }}
          />

          <div
            ref={heroButtonsRef}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center px-2"
          >
            {heroData.buttons.map((button, index) => (
              <button
                key={index}
                className={`px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105 shadow-2xl opacity-0 text-sm sm:text-base ${
                  button.primary
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600"
                    : "border-2 border-white text-white hover:bg-white hover:text-gray-900"
                }`}
              >
                {button.text}
              </button>
            ))}
          </div>

          <div
            ref={heroStatsRef}
            className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto px-2"
          >
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                {/* Div para el número que va a incrementar */}
                <div
                  ref={(el) => (statNumberRefs.current[index] = el)}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-orange-400 mb-1 sm:mb-2"
                >
                  0
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section
        id="servicios"
        ref={serviciosSectionRef}
        className="py-12 sm:py-16 md:py-20 bg-gray-800"
      >
        <div className="container mx-auto px-3 sm:px-4">
          <h2
            ref={serviciosTitleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 opacity-0 px-2"
          >
            NUESTROS <span className="text-orange-400">SERVICIOS</span>
          </h2>
          <p className="text-center text-gray-400 text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-3">
            Ofrecemos todo lo que necesitas para alcanzar tus objetivos fitness
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {serviciosData.map((servicio, index) => (
              <div
                key={index}
                ref={(el) => (serviciosCardsRef.current[index] = el)}
                className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-gray-700 hover:border-orange-500 transition-all duration-300 group opacity-0 mx-2 sm:mx-0"
              >
                <div className="service-icon w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transform group-hover:rotate-12 transition duration-300">
                  <span className="text-2xl sm:text-3xl">{servicio.icon}</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
                  {servicio.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                  {servicio.description}
                </p>
                <ul className="space-y-2 sm:space-y-3">
                  {servicio.features.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-300 text-sm sm:text-base"
                    >
                      <span className="text-green-400 mr-2 text-sm">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HORARIOS SECTION */}
      <section
        id="horarios"
        ref={horariosSectionRef}
        className="py-12 sm:py-16 md:py-20 bg-gray-900"
      >
        <div className="container mx-auto px-3 sm:px-4">
          <h2
            ref={horariosTitleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 opacity-0 px-2"
          >
            <span className="text-orange-400">HORARIOS</span> DE APERTURA
          </h2>
          <p className="text-center text-gray-400 text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-3">
            Estamos abiertos para que entrenes cuando mejor te convenga
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
            <div
              ref={horariosLeftRef}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700 opacity-0"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
                Horario Regular
              </h3>
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {horariosData.regular.map((horario, index) => (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 px-4 sm:py-4 sm:px-5 md:py-5 md:px-6 rounded-lg sm:rounded-xl ${
                      horario.highlight
                        ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-orange-500/30"
                        : "bg-gray-900/50"
                    }`}
                  >
                    <span className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-0">
                      {horario.dia}
                    </span>
                    <div className="text-right">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-white block">
                        {horario.hora}
                      </span>
                      {horario.highlight && (
                        <div className="text-xs sm:text-sm text-orange-400 mt-1">
                          ¡Acceso completo!
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={horariosRightRef}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700 opacity-0"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 text-center">
                Clases Destacadas
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {horariosData.clases.map((clase, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 px-4 sm:py-4 sm:px-5 bg-gray-900/50 rounded-lg sm:rounded-xl hover:bg-gray-800 transition duration-300"
                  >
                    <div>
                      <span className="font-bold text-base sm:text-lg">
                        {clase.clase}
                      </span>
                      <div className="text-xs sm:text-sm text-gray-400">
                        {clase.nivel}
                      </div>
                    </div>
                    <span className="text-orange-400 font-semibold text-sm sm:text-base mt-1 sm:mt-0">
                      {clase.hora}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg sm:rounded-xl border border-orange-500/20">
                <p className="text-center text-gray-300 text-sm sm:text-base">
                  <span className="font-bold text-orange-400">
                    ¡Reserva tu lugar!
                  </span>{" "}
                  Las clases tienen cupo limitado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANES SECTION */}
      <section
        id="planes"
        ref={planesSectionRef}
        className="py-12 sm:py-16 md:py-20 bg-gray-800"
      >
        <div className="container mx-auto px-3 sm:px-4">
          <h2
            ref={planesTitleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 opacity-0 px-2"
          >
            ELEGÍ TU <span className="text-orange-400">PLAN</span>
          </h2>
          <p className="text-center text-gray-400 text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-3">
            Encuentra el plan perfecto para tus objetivos. Sin compromisos,
            cancela cuando quieras.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {planesData.map((plan, index) => (
              <div
                key={index}
                ref={(el) => (planesCardsRef.current[index] = el)}
                className={`${
                  plan.isPopular
                    ? "bg-gradient-to-b from-gray-900 to-black border-2 border-orange-500"
                    : "bg-gray-900/80 border border-gray-700"
                } backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transform hover:scale-105 transition duration-300 relative shadow-xl sm:shadow-2xl opacity-0`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 sm:px-4 sm:py-1 md:px-6 md:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg">
                      MÁS POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6 sm:mb-8">
                  <div
                    className={`inline-block px-2 py-1 sm:px-3 sm:py-1 ${
                      plan.isPopular
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-gray-800 text-gray-400"
                    } rounded-full text-xs sm:text-sm mb-3 sm:mb-4`}
                  >
                    {plan.tag}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                    {plan.title}
                  </h3>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                    {plan.price}
                    <span className="text-sm sm:text-lg text-gray-400">
                      {plan.period}
                    </span>
                  </div>
                  <div
                    className={
                      plan.isPopular
                        ? "text-orange-400 text-sm sm:text-base"
                        : "text-gray-400 text-sm sm:text-base"
                    }
                  >
                    {plan.subtitle}
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span
                        className={`mr-2 sm:mr-3 text-sm ${
                          feature.included ? "text-green-400" : "text-gray-600"
                        }`}
                      >
                        {feature.included ? "✓" : "✗"}
                      </span>
                      <span
                        className={`text-xs sm:text-sm ${
                          feature.included ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 sm:py-4 ${
                    plan.isPopular
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:from-red-600 hover:to-orange-600"
                      : "bg-gray-700 text-white font-semibold hover:bg-gray-600"
                  } rounded-lg sm:rounded-xl transition duration-300 shadow-lg text-sm sm:text-base`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN SECTION */}
      <section
        id="ubicacion"
        ref={ubicacionSectionRef}
        className="py-12 sm:py-16 md:py-20 bg-gray-900"
      >
        <div className="container mx-auto px-3 sm:px-4">
          <h2
            ref={ubicacionTitleRef}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4 opacity-0 px-2"
          >
            <span className="text-orange-400">VISÍTANOS</span>
          </h2>
          <p className="text-center text-gray-400 text-sm sm:text-base mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-3">
            Encuéntranos en la mejor ubicación de la ciudad
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            <div ref={ubicacionLeftRef} className="opacity-0">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700 h-full">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8">
                  IRON GYM CENTRAL
                </h3>
                <div className="space-y-6 sm:space-y-8">
                  {contactoData.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                        <span className="text-lg sm:text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-1">
                          {item.title}
                        </h4>
                        <p
                          className="text-gray-400 text-sm sm:text-base"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                        {item.sub && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                            {item.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

<div ref={ubicacionRightRef} className="opacity-0 mt-8 lg:mt-0">
  <div className="bg-gray-800/30 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700 h-full">
    <div className="h-[300px] sm:h-[400px] md:min-h-[500px] relative">
      
      {/* MAPA REAL */}
      <iframe
        title="Ubicación Iron Gym"
        src="https://www.google.com/maps?q=Calle+72+Carrera+70-35,+Bogotá,+Colombia&output=embed"
        className="w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

    </div>
  </div>
</div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-8 sm:py-10 md:py-12 border-t border-gray-800">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="font-bold text-lg sm:text-xl">G</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold">
                  {footerData.company.name}
                </span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                {footerData.company.description}
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                {footerData.company.social.map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition duration-300"
                  >
                    <span className="text-base sm:text-lg">
                      {social === "instagram"
                        ? "📷"
                        : social === "facebook"
                        ? "📘"
                        : social === "twitter"
                        ? "🐦"
                        : "▶️"}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {footerData.links.map((column, idx) => (
              <div key={idx} className="mt-6 md:mt-0">
                <h4 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 md:mb-6 text-white">
                  {column.title}
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-orange-400 transition duration-300 text-sm sm:text-base"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-500 text-xs sm:text-sm">
            <p>
              © {new Date().getFullYear()} {footerData.company.name}. Todos los
              derechos reservados.
            </p>
            <p className="mt-1 sm:mt-2 text-xs">
              Diseñado con ❤️ para amantes del fitness
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
