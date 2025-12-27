// src/components/cliente/animations/misContactosAnimations.js
import gsap from "gsap";

export const initMisContactosAnimations = (containerRef, cardsRef, formRef, inputsRef, buttonRef) => {
  // Animación de entrada del container
  if (containerRef.current) {
    gsap.fromTo(
      containerRef.current,
      { 
        opacity: 0,
        scale: 0.97,
        y: 8 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.65, 
        ease: "power2.out" 
      }
    );
  }

  // Animación del formulario
  if (formRef.current) {
    gsap.fromTo(
      formRef.current,
      { 
        opacity: 0,
        scale: 0.95,
        y: 20 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.5,
        delay: 0.2,
        ease: "back.out(1.5)"
      }
    );
  }

  // Animación de inputs del formulario (en secuencia)
  if (inputsRef.current.length > 0) {
    inputsRef.current.forEach((input, index) => {
      if (input) {
        gsap.fromTo(
          input,
          { 
            opacity: 0,
            x: -25,
            scale: 0.92 
          },
          { 
            opacity: 1,
            x: 0,
            scale: 1, 
            duration: 0.4,
            delay: 0.3 + (index * 0.15),
            ease: "back.out(1.4)"
          }
        );

        // Efecto focus en inputs
        input.addEventListener("focus", () => {
          gsap.to(input, {
            scale: 1.03,
            boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.15)",
            duration: 0.2,
            ease: "power2.out"
          });
        });
        
        input.addEventListener("blur", () => {
          gsap.to(input, {
            scale: 1,
            boxShadow: "none",
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
        scale: 0.85,
        y: 15 
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
        scale: 1.06,
        boxShadow: "0 10px 35px rgba(249, 115, 22, 0.3)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
    
    buttonRef.current.addEventListener("mouseleave", () => {
      gsap.to(buttonRef.current, {
        scale: 1,
        boxShadow: "0 0 20px rgba(249, 115, 22, 0.15)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
  }

  // Animación de las cards de contactos
  if (cardsRef.current.length > 0) {
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0,
        scale: 0.9,
        y: 30 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.5,
        stagger: 0.08,
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
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
            duration: 0.2,
            ease: "power2.out"
          });
          
          // Animación del icono de teléfono
          const phoneBtn = card.querySelector('button[class*="bg-blue-900"]');
          if (phoneBtn) {
            gsap.to(phoneBtn, {
              scale: 1.1,
              backgroundColor: "rgba(30, 58, 138, 0.4)",
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
          
          const phoneBtn = card.querySelector('button[class*="bg-blue-900"]');
          if (phoneBtn) {
            gsap.to(phoneBtn, {
              scale: 1,
              backgroundColor: "rgba(30, 58, 138, 0.3)",
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });

        // Efecto de pulso en el botón de llamar
        const phoneBtn = card.querySelector('button[class*="bg-blue-900"]');
        if (phoneBtn) {
          gsap.to(phoneBtn, {
            scale: 1.05,
            duration: 0.5,
            delay: 1.2 + (cardsRef.current.indexOf(card) * 0.1),
            repeat: 1,
            yoyo: true,
            ease: "power2.inOut"
          });
        }
      }
    });

    // Efecto especial para el primer contacto (si existe)
    if (cardsRef.current[0]) {
      gsap.to(cardsRef.current[0], {
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)",
        duration: 0.5,
        delay: 1.3,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }

  // Animación de la sección de información importante
  const infoSection = document.querySelector('.glass-effect.rounded-2xl.p-5.mt-6');
  if (infoSection) {
    gsap.fromTo(
      infoSection,
      { 
        opacity: 0,
        y: 20 
      },
      { 
        opacity: 1,
        y: 0, 
        duration: 0.4,
        delay: 1.4,
        ease: "power2.out"
      }
    );

    // Efecto de parpadeo suave en el icono de advertencia
    const warningIcon = infoSection.querySelector('.text-red-400');
    if (warningIcon) {
      gsap.to(warningIcon, {
        opacity: 0.7,
        duration: 0.5,
        delay: 1.6,
        repeat: 2,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }

  // Animación del contador de contactos
  const counterElement = document.querySelector('.bg-blue-900\\/40');
  if (counterElement) {
    gsap.fromTo(
      counterElement,
      { 
        scale: 0.5,
        opacity: 0 
      },
      { 
        scale: 1,
        opacity: 1, 
        duration: 0.4,
        delay: 0.9,
        ease: "back.out(1.7)"
      }
    );
  }

  // Efecto de aparición en los iconos de parentesco
  const parentescoIcons = document.querySelectorAll('.p-3.rounded-xl');
  if (parentescoIcons.length > 0) {
    gsap.fromTo(
      parentescoIcons,
      { 
        rotation: -20,
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
};