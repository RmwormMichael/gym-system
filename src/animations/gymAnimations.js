// src/components/animations/gymAnimations.js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const initHeroAnimations = (refs) => {
  const {
    heroSectionRef,
    heroTitleRef,
    heroSubtitleRef,
    heroButtonsRef,
    heroStatsRef,
    parallaxBgRef,
    statNumberRefs,
  } = refs;

  // Efecto parallax para el fondo (más rápido)
  gsap.to(parallaxBgRef.current, {
    yPercent: 20, // Reducido de 30
    ease: "none",
    scrollTrigger: {
      trigger: heroSectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.8 // Reducido de 1.5
    }
  });

  const titleWords = document.querySelectorAll('.title-word');
  
  // Animación escalonada para cada palabra
  gsap.fromTo(titleWords,
    {
      y: -100,  // Empieza desde arriba
      opacity: 0,
      rotationX: -90,  // Efecto de giro 3D
      scale: 0.5
    },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,  // Retraso entre cada palabra
      ease: "back.out(1.7)",
      delay: 0.3
    }
  );

  // 3. Subtítulo (aparece después de las palabras)
  gsap.fromTo(heroSubtitleRef.current,
    { 
      y: 40, 
      opacity: 0,
      scale: 0.95
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      delay: 0.9,  // Espera a que terminen las palabras
      ease: "power2.out"
    }
  );

  // 4. Botones
  gsap.fromTo(heroButtonsRef.current.children,
    { 
      y: 30, 
      opacity: 0, 
      scale: 0.9 
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      delay: 1.2,  // Espera al subtítulo
      stagger: 0.2,
      ease: "back.out(1.4)"
    }
  );

  // 5. ANIMACIÓN DE NÚMEROS INCREMENTANDO
  const statsData = [
    { target: 1500, suffix: '+' },
    { target: 25, suffix: '+' },
    { target: 50, suffix: '+' },
    { target: 5, suffix: '' }
  ];

  statNumberRefs.current.forEach((numberElement, index) => {
    if (!numberElement) return;
    
    const stat = statsData[index];
    let startValue = 0;
    const endValue = stat.target;
    const duration = 2; // Duración en segundos
    
    // Animación del contador
    const counter = { value: startValue };
    
    gsap.to(counter, {
      value: endValue,
      duration: duration,
      delay: 1.5 + (index * 0.3), // Retraso escalonado
      ease: "power2.out",
      onUpdate: () => {
        if (numberElement) {
          // Formatear el número (sin decimales)
          const displayValue = Math.floor(counter.value);
          numberElement.textContent = `${displayValue}${stat.suffix}`;
        }
      },
      onStart: () => {
        // Agregar clase para efecto visual durante el conteo
        if (numberElement) {
          numberElement.classList.add('counting');
        }
      },
      onComplete: () => {
        // Remover clase cuando termina
        if (numberElement) {
          numberElement.classList.remove('counting');
          // Efecto final cuando termina el conteo
          gsap.to(numberElement, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
          });
        }
      }
    });

    // También animar la entrada del contenedor de estadísticas
    gsap.fromTo(numberElement.parentElement,
      { 
        y: 40, 
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 1.4 + (index * 0.2), // Un poco antes que empiece el conteo
        ease: "power2.out"
      }
    );
  });
};

export const initServiciosAnimations = (refs) => {
  const {
    serviciosSectionRef,
    serviciosTitleRef,
    serviciosCardsRef
  } = refs;

  // Título de servicios (más rápido)
  gsap.fromTo(serviciosTitleRef.current,
    { y: 40, opacity: 0 }, // Reducido de 60
    {
      y: 0,
      opacity: 1,
      duration: 0.8, // Reducido de 1
      scrollTrigger: {
        trigger: serviciosSectionRef.current,
        start: "top 85%", // Cambiado de 80%
        end: "top 60%",
        scrub: 0.5, // Reducido de 1
        toggleActions: "play none none reverse"
      }
    }
  );

  // Tarjetas de servicios (más rápido)
  serviciosCardsRef.current.forEach((card, index) => {
    if (!card) return;
    
    gsap.fromTo(card,
      {
        y: 60, // Reducido de 100
        opacity: 0,
        rotationY: -8, // Reducido de -15
        scale: 0.95 // Reducido de 0.9
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 0.7, // Reducido de 1
        ease: "power2.out", // Cambiado a power2
        scrollTrigger: {
          trigger: card,
          start: "top 90%", // Cambiado de 85%
          end: "top 60%",
          toggleActions: "play none none none",
          once: true
        },
        delay: index * 0.1 // Reducido de 0.15
      }
    );
  });
};

export const initHorariosAnimations = (refs) => {
  const {
    horariosSectionRef,
    horariosTitleRef,
    horariosLeftRef,
    horariosRightRef
  } = refs;

  // Título de horarios (más rápido)
  gsap.fromTo(horariosTitleRef.current,
    { y: 40, opacity: 0 }, // Reducido de 60
    {
      y: 0,
      opacity: 1,
      duration: 0.8, // Reducido de 1
      scrollTrigger: {
        trigger: horariosSectionRef.current,
        start: "top 85%", // Cambiado de 80%
        end: "top 60%",
        scrub: 0.5, // Reducido de 1
        toggleActions: "play none none reverse"
      }
    }
  );

  // Contenedores de horarios (más rápido)
  gsap.fromTo(horariosLeftRef.current,
    {
      x: -50, // Reducido de -80
      opacity: 0,
      rotationY: -5 // Reducido de -10
    },
    {
      x: 0,
      opacity: 1,
      rotationY: 0,
      duration: 0.8, // Reducido de 1.2
      ease: "power2.out", // Cambiado a power2
      scrollTrigger: {
        trigger: horariosLeftRef.current,
        start: "top 90%", // Cambiado de 85%
        end: "top 60%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  gsap.fromTo(horariosRightRef.current,
    {
      x: 50, // Reducido de 80
      opacity: 0,
      rotationY: 5 // Reducido de 10
    },
    {
      x: 0,
      opacity: 1,
      rotationY: 0,
      duration: 0.8, // Reducido de 1.2
      ease: "power2.out", // Cambiado a power2
      scrollTrigger: {
        trigger: horariosRightRef.current,
        start: "top 90%", // Cambiado de 85%
        end: "top 60%",
        toggleActions: "play none none none",
        once: true
      },
      delay: 0.2 // Reducido de 0.3
    }
  );
};

export const initPlanesAnimations = (refs) => {
  const {
    planesSectionRef,
    planesTitleRef,
    planesCardsRef
  } = refs;

  // Título de planes (más rápido)
  gsap.fromTo(planesTitleRef.current,
    { y: 40, opacity: 0 }, // Reducido de 60
    {
      y: 0,
      opacity: 1,
      duration: 0.8, // Reducido de 1
      scrollTrigger: {
        trigger: planesSectionRef.current,
        start: "top 85%", // Cambiado de 80%
        end: "top 60%",
        scrub: 0.5, // Reducido de 1
        toggleActions: "play none none reverse"
      }
    }
  );

  // Tarjetas de planes (más rápido)
  planesCardsRef.current.forEach((card, index) => {
    if (!card) return;
    
    gsap.fromTo(card,
      {
        y: 80, // Reducido de 120
        opacity: 0,
        scale: 0.92, // Aumentado de 0.85
        rotationX: 5 // Reducido de 10
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.9, // Reducido de 1.3
        ease: "power2.out", // Cambiado a power2
        scrollTrigger: {
          trigger: card,
          start: "top 95%", // Cambiado de 90%
          end: "top 60%",
          toggleActions: "play none none none",
          once: true
        },
        delay: index * 0.15 // Reducido de 0.2
      }
    );

    // Efecto hover (más rápido)
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8, // Reducido de -10
        duration: 0.3, // Reducido de 0.4
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3, // Reducido de 0.4
        ease: "power2.out"
      });
    });
  });
};

export const initUbicacionAnimations = (refs) => {
  const {
    ubicacionSectionRef,
    ubicacionTitleRef,
    ubicacionLeftRef,
    ubicacionRightRef
  } = refs;

  // Título de ubicación (más rápido)
  gsap.fromTo(ubicacionTitleRef.current,
    { y: 40, opacity: 0 }, // Reducido de 60
    {
      y: 0,
      opacity: 1,
      duration: 0.8, // Reducido de 1
      scrollTrigger: {
        trigger: ubicacionSectionRef.current,
        start: "top 85%", // Cambiado de 80%
        end: "top 60%",
        scrub: 0.5, // Reducido de 1
        toggleActions: "play none none reverse"
      }
    }
  );

  // Sección izquierda (más rápido)
  gsap.fromTo(ubicacionLeftRef.current,
    {
      x: -40, // Reducido de -60
      opacity: 0,
      scale: 0.97 // Aumentado de 0.95
    },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8, // Reducido de 1.2
      ease: "power2.out", // Cambiado a power2
      scrollTrigger: {
        trigger: ubicacionLeftRef.current,
        start: "top 90%", // Cambiado de 85%
        end: "top 60%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // Sección derecha (mapa) (más rápido)
  gsap.fromTo(ubicacionRightRef.current,
    {
      x: 40, // Reducido de 60
      opacity: 0,
      scale: 0.97 // Aumentado de 0.95
    },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8, // Reducido de 1.2
      ease: "power2.out", // Cambiado a power2
      scrollTrigger: {
        trigger: ubicacionRightRef.current,
        start: "top 90%", // Cambiado de 85%
        end: "top 60%",
        toggleActions: "play none none none",
        once: true
      },
      delay: 0.25 // Reducido de 0.4
    }
  );
};

export const initGlobalAnimations = () => {
  // Animación para todos los títulos de sección (más rápido)
  const sectionTitles = document.querySelectorAll('h2');
  sectionTitles.forEach((title, index) => {
    gsap.fromTo(title,
      { y: 30, opacity: 0 }, // Reducido de 50
      {
        y: 0,
        opacity: 1,
        duration: 0.7, // Reducido de 1
        scrollTrigger: {
          trigger: title,
          start: "top 90%", // Cambiado de 85%
          end: "top 65%", // Cambiado de 60%
          toggleActions: "play none none reverse"
        },
        delay: index * 0.05 // Reducido de 0.1
      }
    );
  });

  // Efecto flotante para íconos de servicios (más rápido)
  const serviceIcons = document.querySelectorAll('.service-icon');
  serviceIcons.forEach((icon) => {
    gsap.to(icon, {
      y: -6, // Reducido de -10
      duration: 1.5, // Reducido de 2
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
};

// Función principal que ejecuta todas las animaciones
export const initAllAnimations = (refs) => {
  initHeroAnimations(refs);
  initServiciosAnimations(refs);
  initHorariosAnimations(refs);
  initPlanesAnimations(refs);
  initUbicacionAnimations(refs);
  initGlobalAnimations();
};