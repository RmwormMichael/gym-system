// src/components/entrenador/animations/medicionesAnimations.js
import gsap from "gsap";

export const initMedicionesEntrenadorAnimations = (containerRef, cardsRef, formRef, inputsRef, buttonRef) => {
  // Animación de entrada del container
  if (containerRef.current) {
    gsap.fromTo(
      containerRef.current,
      { 
        opacity: 0,
        scale: 0.97,
        y: 10 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }
    );
  }

  // Animación del formulario completo
  if (formRef.current) {
    gsap.fromTo(
      formRef.current,
      { 
        opacity: 0,
        x: -30,
        scale: 0.95 
      },
      { 
        opacity: 1,
        x: 0,
        scale: 1, 
        duration: 0.5,
        delay: 0.2,
        ease: "back.out(1.5)"
      }
    );
  }

  // Animación de inputs del formulario (secuencial)
  if (inputsRef.current.length > 0) {
    inputsRef.current.forEach((input, index) => {
      if (input) {
        gsap.fromTo(
          input,
          { 
            opacity: 0,
            y: 20,
            scale: 0.9 
          },
          { 
            opacity: 1,
            y: 0,
            scale: 1, 
            duration: 0.4,
            delay: 0.3 + (index * 0.1),
            ease: "back.out(1.4)"
          }
        );

        // Efecto focus en inputs
        input.addEventListener("focus", () => {
          gsap.to(input, {
            scale: 1.02,
            duration: 0.2,
            ease: "power2.out"
          });
        });
        
        input.addEventListener("blur", () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      }
    });
  }

  // Animación del botón de guardar
  if (buttonRef.current) {
    gsap.fromTo(
      buttonRef.current,
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
        delay: 0.7,
        ease: "back.out(1.7)"
      }
    );

    // Efecto hover más pronunciado en botón
    buttonRef.current.addEventListener("mouseenter", () => {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(249, 115, 22, 0.4)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
    
    buttonRef.current.addEventListener("mouseleave", () => {
      gsap.to(buttonRef.current, {
        scale: 1,
        boxShadow: "none",
        duration: 0.2,
        ease: "power2.out"
      });
    });
  }

  // Animación de las cards de mediciones
  if (cardsRef.current.length > 0) {
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0,
        x: 40,
        scale: 0.92 
      },
      { 
        opacity: 1,
        x: 0,
        scale: 1, 
        duration: 0.5,
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
            scale: 1.03,
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
            duration: 0.2,
            ease: "power2.out"
          });
          
          // Resaltar el IMC al hacer hover
          const imcElement = card.querySelector('.text-2xl');
          if (imcElement) {
            gsap.to(imcElement, {
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
          
          const imcElement = card.querySelector('.text-2xl');
          if (imcElement) {
            gsap.to(imcElement, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      }
    });

    // Efecto especial para la primera card (última medición)
    if (cardsRef.current[0]) {
      gsap.to(cardsRef.current[0], {
        scale: 1.02,
        duration: 0.5,
        delay: 1.3,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }

  // Efecto sutil en estadísticas rápidas
  const statsElement = document.querySelector('.glass-effect.rounded-2xl.p-4');
  if (statsElement) {
    gsap.fromTo(
      statsElement,
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
};