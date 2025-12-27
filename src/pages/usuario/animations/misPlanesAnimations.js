// src/components/cliente/animations/misPlanesAnimations.js
import gsap from "gsap";

export const initMisPlanesAnimations = (containerRef, planCardRef, statsRef, detailsRef, planActivo) => {
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

  // Animación de la tarjeta principal del plan
  if (planCardRef.current) {
    gsap.fromTo(
      planCardRef.current,
      { 
        opacity: 0,
        scale: 0.95,
        y: 30 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.6,
        delay: 0.2,
        ease: "back.out(1.5)"
      }
    );

    // Efecto de brillo si el plan está activo
    if (planActivo) {
      gsap.to(planCardRef.current, {
        boxShadow: "0 0 30px rgba(34, 197, 94, 0.1)",
        duration: 0.5,
        delay: 0.8,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
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
            y: 20,
            rotationX: -10 
          },
          { 
            opacity: 1,
            scale: 1,
            y: 0,
            rotationX: 0, 
            duration: 0.5,
            delay: 0.4 + (index * 0.1),
            ease: "back.out(1.6)"
          }
        );

        // Efecto hover en estadísticas
        stat.addEventListener("mouseenter", () => {
          gsap.to(stat, {
            scale: 1.07,
            y: -5,
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

  // Animación de detalles (descripción, progreso)
  if (detailsRef.current.length > 0) {
    detailsRef.current.forEach((detail, index) => {
      if (detail) {
        gsap.fromTo(
          detail,
          { 
            opacity: 0,
            x: index % 2 === 0 ? -20 : 20,
            scale: 0.96 
          },
          { 
            opacity: 1,
            x: 0,
            scale: 1, 
            duration: 0.5,
            delay: 0.8 + (index * 0.15),
            ease: "power3.out"
          }
        );
      }
    });

    // Animación de la barra de progreso
    const progressBar = document.querySelector('.bg-gradient-to-r.from-orange-500.to-orange-600');
    if (progressBar) {
      gsap.fromTo(
        progressBar,
        { 
          scaleX: 0,
          opacity: 0.5 
        },
        { 
          scaleX: 1,
          opacity: 1, 
          duration: 1.2,
          delay: 1,
          ease: "power3.out",
          transformOrigin: "left center"
        }
      );
    }
  }

  // Animación del icono principal del plan
  const planIcon = document.querySelector('.p-3.rounded-xl');
  if (planIcon) {
    gsap.fromTo(
      planIcon,
      { 
        rotation: -30,
        scale: 0.8,
        opacity: 0 
      },
      { 
        rotation: 0,
        scale: 1,
        opacity: 1, 
        duration: 0.6,
        delay: 0.3,
        ease: "back.out(1.7)"
      }
    );

    // Efecto de pulso suave en el icono
    gsap.to(planIcon, {
      scale: 1.05,
      duration: 0.5,
      delay: 1.5,
      repeat: 1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }

  // Animación del estado del plan (activo/inactivo)
  const planStatus = document.querySelector('.px-3.py-1.rounded-full');
  if (planStatus) {
    gsap.fromTo(
      planStatus,
      { 
        scale: 0.5,
        opacity: 0 
      },
      { 
        scale: 1,
        opacity: 1, 
        duration: 0.4,
        delay: 0.5,
        ease: "back.out(1.8)"
      }
    );

    // Efecto de parpadeo si el plan está activo
    if (planActivo) {
      gsap.to(planStatus, {
        boxShadow: "0 0 15px rgba(34, 197, 94, 0.3)",
        duration: 0.5,
        delay: 1.2,
        repeat: 2,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }

  // Animación de los botones de acción
  const actionButtons = document.querySelectorAll('.grid.grid-cols-1 button');
  if (actionButtons.length > 0) {
    gsap.fromTo(
      actionButtons,
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
        delay: 1.3,
        ease: "power3.out"
      }
    );

    // Efecto hover en botones de acción
    actionButtons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: "power2.out"
        });
        
        const icon = button.querySelector('.text-2xl');
        if (icon) {
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
      
      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
        
        const icon = button.querySelector('.text-2xl');
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    });
  }

  // Animación de la lista de beneficios
  const benefitsList = document.querySelectorAll('li.flex.items-center.gap-2');
  if (benefitsList.length > 0) {
    gsap.fromTo(
      benefitsList,
      { 
        opacity: 0,
        x: -15 
      },
      { 
        opacity: 1,
        x: 0, 
        duration: 0.3,
        stagger: 0.08,
        delay: 1.1,
        ease: "power2.out"
      }
    );
  }

  // Efecto de conteo en el precio (opcional)
  const priceElement = document.querySelector('.text-green-400.font-bold');
  if (priceElement) {
    gsap.fromTo(
      priceElement,
      { 
        scale: 1.3,
        opacity: 0.7 
      },
      { 
        scale: 1,
        opacity: 1, 
        duration: 0.5,
        delay: 0.6,
        ease: "back.out(1.7)"
      }
    );
  }
};