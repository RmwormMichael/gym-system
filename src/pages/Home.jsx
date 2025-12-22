// src/components/pages/Home.jsx
import React, { useRef, useEffect } from 'react';
import { initAllAnimations } from '../animations/gymAnimations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Importa todos los datos
import {
  heroData,
  statsData,
  serviciosData,
  horariosData,
  planesData,
  contactoData,
  footerData
} from '../data/gymData';

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
      ubicacionRightRef
    };

    initAllAnimations(refs);

    // Función de limpieza si es necesario
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* HERO SECTION */}
      <section id="inicio" ref={heroSectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div ref={parallaxBgRef} className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")'}}>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 ref={heroTitleRef} className="text-6xl md:text-7xl font-bold mb-6 tracking-tight opacity-0">
            {heroData.title} <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">{heroData.highlight}</span>
          </h1>
          <p ref={heroSubtitleRef} className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto opacity-0" dangerouslySetInnerHTML={{ __html: heroData.subtitle }} />
          
          <div ref={heroButtonsRef} className="flex flex-col sm:flex-row gap-6 justify-center">
            {heroData.buttons.map((button, index) => (
              <button
                key={index}
                className={`px-8 py-4 rounded-lg font-bold transition duration-300 transform hover:scale-105 shadow-2xl opacity-0 ${
                  button.primary
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600'
                    : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                {button.text}
              </button>
            ))}
          </div>
          
          <div ref={heroStatsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center opacity-0">
                <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS SECTION */}
      <section id="servicios" ref={serviciosSectionRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 ref={serviciosTitleRef} className="text-4xl font-bold text-center mb-4 opacity-0">
            NUESTROS <span className="text-orange-400">SERVICIOS</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Ofrecemos todo lo que necesitas para alcanzar tus objetivos fitness
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviciosData.map((servicio, index) => (
              <div key={index} ref={el => serviciosCardsRef.current[index] = el} className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all duration-300 group opacity-0">
                <div className="service-icon w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition duration-300">
                  <span className="text-3xl">{servicio.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{servicio.title}</h3>
                <p className="text-gray-400 mb-6">{servicio.description}</p>
                <ul className="space-y-3">
                  {servicio.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-2">✓</span>
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
      <section id="horarios" ref={horariosSectionRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 ref={horariosTitleRef} className="text-4xl font-bold text-center mb-4 opacity-0">
            <span className="text-orange-400">HORARIOS</span> DE APERTURA
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Estamos abiertos para que entrenes cuando mejor te convenga
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div ref={horariosLeftRef} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 opacity-0">
              <h3 className="text-2xl font-bold mb-8 text-center">Horario Regular</h3>
              <div className="space-y-6">
                {horariosData.regular.map((horario, index) => (
                  <div key={index} className={`flex justify-between items-center py-5 px-6 rounded-xl ${horario.highlight ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-orange-500/30' : 'bg-gray-900/50'}`}>
                    <span className="text-xl font-semibold">{horario.dia}</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">{horario.hora}</span>
                      {horario.highlight && <div className="text-sm text-orange-400 mt-1">¡Acceso completo!</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={horariosRightRef} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 opacity-0">
              <h3 className="text-2xl font-bold mb-8 text-center">Clases Destacadas</h3>
              <div className="space-y-4">
                {horariosData.clases.map((clase, index) => (
                  <div key={index} className="flex justify-between items-center py-4 px-6 bg-gray-900/50 rounded-xl hover:bg-gray-800 transition duration-300">
                    <div>
                      <span className="font-bold text-lg">{clase.clase}</span>
                      <div className="text-sm text-gray-400">{clase.nivel}</div>
                    </div>
                    <span className="text-orange-400 font-semibold">{clase.hora}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl border border-orange-500/20">
                <p className="text-center text-gray-300">
                  <span className="font-bold text-orange-400">¡Reserva tu lugar!</span> Las clases tienen cupo limitado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANES SECTION */}
      <section id="planes" ref={planesSectionRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 ref={planesTitleRef} className="text-4xl font-bold text-center mb-4 opacity-0">
            ELEGÍ TU <span className="text-orange-400">PLAN</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Encuentra el plan perfecto para tus objetivos. Sin compromisos, cancela cuando quieras.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {planesData.map((plan, index) => (
              <div key={index} ref={el => planesCardsRef.current[index] = el} className={`${plan.isPopular ? 'bg-gradient-to-b from-gray-900 to-black border-2 border-orange-500' : 'bg-gray-900/80 border border-gray-700'} backdrop-blur-sm rounded-2xl p-8 transform hover:scale-105 transition duration-300 relative shadow-2xl opacity-0`}>
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg">
                      MÁS POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`inline-block px-4 py-1 ${plan.isPopular ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-800 text-gray-400'} rounded-full text-sm mb-4`}>
                    {plan.tag}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{plan.title}</h3>
                  <div className="text-5xl font-bold text-white mb-2">
                    {plan.price}<span className="text-lg text-gray-400">{plan.period}</span>
                  </div>
                  <div className={plan.isPopular ? 'text-orange-400' : 'text-gray-400'}>{plan.subtitle}</div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className={`mr-3 ${feature.included ? 'text-green-400' : 'text-gray-600'}`}>
                        {feature.included ? '✓' : '✗'}
                      </span>
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-600'}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-4 ${plan.isPopular ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:from-red-600 hover:to-orange-600' : 'bg-gray-700 text-white font-semibold hover:bg-gray-600'} rounded-xl transition duration-300 shadow-lg`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN SECTION */}
      <section id="ubicacion" ref={ubicacionSectionRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 ref={ubicacionTitleRef} className="text-4xl font-bold text-center mb-4 opacity-0">
            <span className="text-orange-400">VISÍTANOS</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Encuéntranos en la mejor ubicación de la ciudad
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div ref={ubicacionLeftRef} className="opacity-0">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 h-full">
                <h3 className="text-2xl font-bold mb-8">IRON GYM CENTRAL</h3>
                <div className="space-y-8">
                  {contactoData.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: item.content }} />
                        {item.sub && <p className="text-sm text-gray-500 mt-2">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={ubicacionRightRef} className="opacity-0">
              <div className="bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700 h-full">
                <div className="h-full min-h-[500px] relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-6">🏋️‍♂️</div>
                      <h3 className="text-2xl font-bold mb-4">IRON GYM - SEDE CENTRAL</h3>
                      <div className="space-y-2 text-gray-400 mb-8">
                        <p>📍 Av. Fitness #789, Ciudad Deportiva</p>
                        <p>🚗 Estacionamiento gratuito</p>
                        <p>🚇 Metro: Estación Olympia (Línea 3)</p>
                      </div>
                      <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl hover:from-red-600 hover:to-orange-600 transition duration-300 font-semibold shadow-lg">
                        Abrir en Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="font-bold text-xl">G</span>
                </div>
                <span className="text-2xl font-bold">{footerData.company.name}</span>
              </div>
              <p className="text-gray-400 mb-6">{footerData.company.description}</p>
              <div className="flex space-x-4">
                {footerData.company.social.map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition duration-300">
                    <span className="text-lg">
                      {social === 'instagram' ? '📷' : social === 'facebook' ? '📘' : social === 'twitter' ? '🐦' : '▶️'}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            {footerData.links.map((column, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg mb-6 text-white">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-gray-400 hover:text-orange-400 transition duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} {footerData.company.name}. Todos los derechos reservados.</p>
            <p className="mt-2 text-sm">Diseñado con ❤️ para amantes del fitness</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;