// src/components/cliente/animations/misAsistenciasAnimations.js
import gsap from "gsap";

export const initMisAsistenciasAnimations = (containerRef, cardsRef, statsRef, filtersRef) => {
  // Animación de entrada del container
  if (containerRef.current) {
    gsap.fromTo(
      containerRef.current,
      { 
        opacity: 0,
        scale: 0.98,
        y: 10 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.7, 
        ease: "power2.out" 
      }
    );
  }

  // Animación de estadísticas
  if (statsRef.current.length > 0) {
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.fromTo(
          stat,
          { 
            opacity: 0,
            scale: 0.9,
            y: 25,
            rotation: -5 
          },
          { 
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0, 
            duration: 0.5,
            delay: 0.2 + (index * 0.1),
            ease: "back.out(1.6)"
          }
        );

        // Efecto hover en estadísticas
        stat.addEventListener("mouseenter", () => {
          gsap.to(stat, {
            scale: 1.06,
            y: -3,
            duration: 0.2,
            ease: "power2.out"
          });
        });
        
        stat.addEventListener("mouseleave", () => {
          gsap.to(stat, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      }
    });
  }

  // Animación de filtros
  if (filtersRef.current.length > 0) {
    gsap.fromTo(
      filtersRef.current,
      { 
        opacity: 0,
        y: 20,
        scale: 0.95 
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1, 
        duration: 0.4,
        stagger: 0.1,
        delay: 0.6,
        ease: "power3.out"
      }
    );

    // Efecto hover en filtros
    filtersRef.current.forEach((filter) => {
      if (filter) {
        filter.addEventListener("mouseenter", () => {
          if (!filter.classList.contains('bg-gradient-to-r')) {
            gsap.to(filter, {
              scale: 1.05,
              duration: 0.15,
              ease: "power2.out"
            });
          }
        });
        
        filter.addEventListener("mouseleave", () => {
          if (!filter.classList.contains('bg-gradient-to-r')) {
            gsap.to(filter, {
              scale: 1,
              duration: 0.15,
              ease: "power2.out"
            });
          }
        });
      }
    });
  }

  // Animación de las cards de asistencias
  if (cardsRef.current.length > 0) {
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0,
        y: 40,
        scale: 0.94 
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1, 
        duration: 0.6,
        stagger: 0.06,
        delay: 0.8,
        ease: "power3.out"
      }
    );

    // Efecto hover en cards
    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            boxShadow: "0 20px 50px rgba(249, 115, 22, 0.15)",
            duration: 0.2,
            ease: "power2.out"
          });
          
          // Resaltar la duración si existe
          const duracionElement = card.querySelector('.text-purple-300');
          if (duracionElement) {
            gsap.to(duracionElement, {
              scale: 1.1,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "none",
            duration: 0.2,
            ease: "power2.out"
          });
          
          const duracionElement = card.querySelector('.text-purple-300');
          if (duracionElement) {
            gsap.to(duracionElement, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      }
    });

    // Efecto especial para asistencias recientes (últimas 3)
    cardsRef.current.slice(0, 3).forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.2)",
          duration: 0.5,
          delay: 1.2 + (index * 0.2),
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }
    });
  }

  // Animación de la sección de resumen
  const resumenSection = document.querySelector('.glass-effect.rounded-2xl.p-5.mt-6');
  if (resumenSection) {
    gsap.fromTo(
      resumenSection,
      { 
        opacity: 0,
        y: 20 
      },
      { 
        opacity: 1,
        y: 0, 
        duration: 0.4,
        delay: 1.5,
        ease: "power2.out"
      }
    );
  }

  // Animación del contador de resultados
  const resultsCounter = document.querySelector('.text-gray-400.text-sm');
  if (resultsCounter) {
    gsap.fromTo(
      resultsCounter,
      { 
        opacity: 0,
        scale: 0.9 
      },
      { 
        opacity: 1,
        scale: 1, 
        duration: 0.4,
        delay: 0.9,
        ease: "power2.out"
      }
    );
  }

  // Efecto de aparición en los iconos de estado
  const statusIcons = document.querySelectorAll('.p-2.rounded-lg');
  if (statusIcons.length > 0) {
    gsap.fromTo(
      statusIcons,
      { 
        rotation: -15,
        scale: 0.8,
        opacity: 0 
      },
      { 
        rotation: 0,
        scale: 1,
        opacity: 1, 
        duration: 0.4,
        stagger: 0.05,
        delay: 0.85,
        ease: "back.out(1.5)"
      }
    );
  }

  // Efecto de conteo en el número total de asistencias
  const totalAsistencias = document.querySelector('.text-orange-400.font-bold');
  if (totalAsistencias) {
    gsap.fromTo(
      totalAsistencias,
      { 
        scale: 1.4,
        opacity: 0.6 
      },
      { 
        scale: 1,
        opacity: 1, 
        duration: 0.5,
        delay: 0.4,
        ease: "back.out(1.8)"
      }
    );
  }
};