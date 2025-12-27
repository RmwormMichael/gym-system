// src/components/entrenador/animations/entrenadorAnimations.js
import gsap from "gsap";

export const initEntrenadorAnimations = (containerRef, tabsRef, contentRef) => {
  // Animar entrada del container
  if (containerRef.current) {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out" 
      }
    );
  }

  // Animar tabs con efecto de rebote
  tabsRef.current.forEach((tabEl, index) => {
    if (tabEl) {
      gsap.fromTo(
        tabEl,
        { 
          opacity: 0, 
          y: -20,
          scale: 0.8 
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.15,
          ease: "back.out(1.7)",
        }
      );
    }
  });

  // Animar contenido inicial
  if (contentRef.current) {
    gsap.fromTo(
      contentRef.current,
      { 
        opacity: 0,
        scale: 0.95 
      },
      { 
        opacity: 1,
        scale: 1, 
        duration: 0.7, 
        ease: "power3.out",
        delay: 0.3
      }
    );
  }
};

export const animateTabChange = (contentRef, onComplete) => {
  if (!contentRef.current) {
    onComplete();
    return;
  }

  // Animación de salida más rápida para entrenador
  gsap.to(contentRef.current, {
    opacity: 0,
    scale: 0.95,
    duration: 0.25,
    ease: "power2.in",
    onComplete: () => {
      onComplete();
      
      setTimeout(() => {
        // Animación de entrada con efecto de resorte
        gsap.fromTo(
          contentRef.current,
          { 
            opacity: 0,
            scale: 0.97 
          },
          { 
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(1.4)"
          }
        );
      }, 30);
    }
  });
};