// src/components/cliente/animations/misMedicionesAnimations.js
import gsap from "gsap";

export const initMisMedicionesAnimations = (containerRef, cardsRef, statsRef, chartRef) => {
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

  // Animación de estadísticas con efecto de carta
  if (statsRef.current.length > 0) {
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        gsap.fromTo(
          stat,
          { 
            opacity: 0,
            scale: 0.9,
            y: 25,
            rotationY: -15 
          },
          { 
            opacity: 1,
            scale: 1,
            y: 0,
            rotationY: 0, 
            duration: 0.5,
            delay: 0.2 + (index * 0.1),
            ease: "back.out(1.6)"
          }
        );

        // Efecto hover en estadísticas
        stat.addEventListener("mouseenter", () => {
          gsap.to(stat, {
            scale: 1.05,
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

  // Animación del gráfico de progreso
  if (chartRef.current) {
    const bars = chartRef.current.querySelectorAll('div[class*="bg-gradient-to-t"]');
    if (bars.length > 0) {
      gsap.fromTo(
        bars,
        { 
          scaleY: 0,
          opacity: 0.5 
        },
        { 
          scaleY: 1,
          opacity: 1, 
          duration: 0.8,
          stagger: 0.1,
          delay: 0.6,
          ease: "power3.out",
          transformOrigin: "bottom center"
        }
      );
    }
  }

  // Animación de las cards de mediciones
  if (cardsRef.current.length > 0) {
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0,
        y: 40,
        scale: 0.95 
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1, 
        duration: 0.6,
        stagger: 0.07,
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
            boxShadow: "0 15px 40px rgba(249, 115, 22, 0.15)",
            duration: 0.2,
            ease: "power2.out"
          });
          
          // Animación suave de los valores
          const valores = card.querySelectorAll('.text-2xl, .text-3xl');
          gsap.to(valores, {
            scale: 1.05,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.out"
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "none",
            duration: 0.2,
            ease: "power2.out"
          });
          
          const valores = card.querySelectorAll('.text-2xl, .text-3xl');
          gsap.to(valores, {
            scale: 1,
            duration: 0.2,
            stagger: 0.05,
            ease: "power2.out"
          });
        });
      }
    });

    // Efecto especial para la última medición (más reciente)
    if (cardsRef.current[0]) {
      gsap.to(cardsRef.current[0], {
        boxShadow: "0 0 0 2px rgba(249, 115, 22, 0.3)",
        duration: 0.5,
        delay: 1.2,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }

  // Efecto de conteo en el número total de mediciones
  const totalElement = document.querySelector('.text-orange-400.font-bold');
  if (totalElement) {
    gsap.fromTo(
      totalElement,
      { 
        scale: 1.3,
        opacity: 0.7 
      },
      { 
        scale: 1,
        opacity: 1, 
        duration: 0.5,
        delay: 0.4,
        ease: "back.out(1.7)"
      }
    );
  }

  // Animación de los iconos de las cards
  const iconos = document.querySelectorAll('.p-2.rounded-lg');
  if (iconos.length > 0) {
    gsap.fromTo(
      iconos,
      { 
        rotation: -10,
        opacity: 0 
      },
      { 
        rotation: 0,
        opacity: 1, 
        duration: 0.4,
        stagger: 0.05,
        delay: 0.9,
        ease: "back.out(1.5)"
      }
    );
  }
};