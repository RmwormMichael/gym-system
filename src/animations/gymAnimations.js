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
    parallaxBgRef
  } = refs;

  // Efecto parallax para el fondo
  gsap.to(parallaxBgRef.current, {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: heroSectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1.5
    }
  });

  // Animación de entrada para el hero
  gsap.fromTo([heroTitleRef.current, heroSubtitleRef.current], 
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.4,
      ease: "power3.out",
      delay: 0.3
    }
  );

  // Animación para botones
  gsap.fromTo(heroButtonsRef.current.children,
    { y: 50, opacity: 0, scale: 0.8 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 1,
      stagger: 0.3,
      ease: "back.out(1.7)"
    }
  );

  // Animación escalonada para estadísticas
  gsap.fromTo(heroStatsRef.current.children,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 1.5,
      stagger: 0.2,
      ease: "power2.out"
    }
  );
};

export const initServiciosAnimations = (refs) => {
  const {
    serviciosSectionRef,
    serviciosTitleRef,
    serviciosCardsRef
  } = refs;

  // Título de servicios
  gsap.fromTo(serviciosTitleRef.current,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: serviciosSectionRef.current,
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    }
  );

  // Tarjetas de servicios
  serviciosCardsRef.current.forEach((card, index) => {
    if (!card) return;
    
    gsap.fromTo(card,
      {
        y: 100,
        opacity: 0,
        rotationY: -15,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
          once: true
        },
        delay: index * 0.15
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

  // Título de horarios
  gsap.fromTo(horariosTitleRef.current,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: horariosSectionRef.current,
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    }
  );

  // Contenedores de horarios
  gsap.fromTo(horariosLeftRef.current,
    {
      x: -80,
      opacity: 0,
      rotationY: -10
    },
    {
      x: 0,
      opacity: 1,
      rotationY: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: horariosLeftRef.current,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  gsap.fromTo(horariosRightRef.current,
    {
      x: 80,
      opacity: 0,
      rotationY: 10
    },
    {
      x: 0,
      opacity: 1,
      rotationY: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: horariosRightRef.current,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none none",
        once: true
      },
      delay: 0.3
    }
  );
};

export const initPlanesAnimations = (refs) => {
  const {
    planesSectionRef,
    planesTitleRef,
    planesCardsRef
  } = refs;

  // Título de planes
  gsap.fromTo(planesTitleRef.current,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: planesSectionRef.current,
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    }
  );

  // Tarjetas de planes
  planesCardsRef.current.forEach((card, index) => {
    if (!card) return;
    
    gsap.fromTo(card,
      {
        y: 120,
        opacity: 0,
        scale: 0.85,
        rotationX: 10
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 60%",
          toggleActions: "play none none none",
          once: true
        },
        delay: index * 0.2
      }
    );

    // Efecto hover
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        duration: 0.4,
        ease: "power2.out"
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
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

  // Título de ubicación
  gsap.fromTo(ubicacionTitleRef.current,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: ubicacionSectionRef.current,
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    }
  );

  // Sección izquierda
  gsap.fromTo(ubicacionLeftRef.current,
    {
      x: -60,
      opacity: 0,
      scale: 0.95
    },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ubicacionLeftRef.current,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none none",
        once: true
      }
    }
  );

  // Sección derecha (mapa)
  gsap.fromTo(ubicacionRightRef.current,
    {
      x: 60,
      opacity: 0,
      scale: 0.95
    },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ubicacionRightRef.current,
        start: "top 85%",
        end: "top 50%",
        toggleActions: "play none none none",
        once: true
      },
      delay: 0.4
    }
  );
};

export const initGlobalAnimations = () => {
  // Animación para todos los títulos de sección
  const sectionTitles = document.querySelectorAll('h2');
  sectionTitles.forEach((title, index) => {
    gsap.fromTo(title,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          end: "top 60%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.1
      }
    );
  });

  // Efecto flotante para íconos de servicios
  const serviceIcons = document.querySelectorAll('.service-icon');
  serviceIcons.forEach((icon) => {
    gsap.to(icon, {
      y: -10,
      duration: 2,
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