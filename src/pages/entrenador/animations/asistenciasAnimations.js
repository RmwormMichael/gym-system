// src/components/entrenador/animations/asistenciasAnimations.js
import gsap from "gsap";

export const initAsistenciasEntrenadorAnimations = (containerRef, cardsRef, formRef, buttonsRef) => {
  // Animación de entrada del container
  if (containerRef.current) {
    gsap.fromTo(
      containerRef.current,
      { 
        opacity: 0,
        scale: 0.95,
        y: 20 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.7, 
        ease: "back.out(1.4)" 
      }
    );
  }

  // Animación del formulario (selector de usuario)
  if (formRef.current) {
    gsap.fromTo(
      formRef.current,
      { 
        opacity: 0,
        y: 30 
      },
      { 
        opacity: 1,
        y: 0, 
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out"
      }
    );
  }

  // Animación de los botones (entrada/salida)
  if (buttonsRef.current.length > 0) {
    gsap.fromTo(
      buttonsRef.current,
      { 
        opacity: 0,
        scale: 0.8,
        y: 20 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.4,
        stagger: 0.1,
        delay: 0.3,
        ease: "back.out(1.7)"
      }
    );

    // Efecto hover en botones
    buttonsRef.current.forEach((button) => {
      if (button) {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.15,
            ease: "power2.out"
          });
        });
        
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.15,
            ease: "power2.out"
          });
        });
      }
    });
  }

  // Animación de las cards de usuarios activos
  if (cardsRef.current.length > 0) {
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0,
        x: -40,
        scale: 0.9 
      },
      { 
        opacity: 1,
        x: 0,
        scale: 1, 
        duration: 0.5,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out"
      }
    );

    // Efecto hover en cards
    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            boxShadow: "0 10px 25px rgba(34, 197, 94, 0.2)",
            duration: 0.2,
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
        });
      }
    });
  }

  // Efecto pulsante para el contador de usuarios activos
  if (cardsRef.current.length > 0) {
    const activeCount = document.querySelector('.text-green-400.font-semibold');
    if (activeCount) {
      gsap.to(activeCount, {
        scale: 1.1,
        duration: 0.3,
        repeat: 1,
        yoyo: true,
        delay: 0.8,
        ease: "power2.inOut"
      });
    }
  }
};