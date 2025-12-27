// src/components/admin/animations/asistenciasAnimations.js
import gsap from "gsap";

export const initAsistenciasAnimations = (containerRef, statsRef, cardsRef) => {
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

  // Animar estadísticas con stagger
  if (statsRef.current.length > 0) {
    gsap.fromTo(
      statsRef.current,
      { 
        scale: 0.8,
        opacity: 0,
        y: 20 
      },
      { 
        scale: 1,
        opacity: 1,
        y: 0, 
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
        delay: 0.2
      }
    );
  }

  // Animar cards de usuarios activos
  if (cardsRef.current.length > 0) {
    gsap.fromTo(
      cardsRef.current,
      { 
        x: -30, 
        opacity: 0 
      },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.4
      }
    );

    // Efecto hover en cards
    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
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