// src/components/admin/animations/medicionesAnimations.js
import gsap from "gsap";

export const initMedicionesAnimations = (containerRef, statsRef, cardsRef, formRef) => {
  // Animar entrada del container
  if (containerRef.current) {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      }
    );
  }

  // Animar formulario
  if (formRef.current) {
    gsap.fromTo(
      formRef.current,
      { 
        scale: 0.95,
        opacity: 0,
        y: 20 
      },
      { 
        scale: 1,
        opacity: 1,
        y: 0, 
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.2
      }
    );
  }

  // Animar estadísticas
  if (statsRef.current.length > 0) {
    gsap.fromTo(
      statsRef.current,
      { 
        scale: 0.8,
        opacity: 0,
        rotation: -5 
      },
      { 
        scale: 1,
        opacity: 1,
        rotation: 0, 
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)",
        delay: 0.4
      }
    );
  }

  // Animar cards de mediciones
  if (cardsRef.current.length > 0) {
    gsap.fromTo(
      cardsRef.current,
      { 
        x: -50, 
        opacity: 0,
        scale: 0.9 
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1, 
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.6
      }
    );

    // Efecto hover en cards
    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out"
          });
        });
        
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      }
    });
  }
};