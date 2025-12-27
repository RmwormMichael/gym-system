// src/components/entrenador/animations/usuariosAnimations.js
import gsap from "gsap";

export const initUsuariosEntrenadorAnimations = (containerRef, cardsRef, statsRef, searchRef) => {
  // Animación de entrada del container
  if (containerRef.current) {
    gsap.fromTo(
      containerRef.current,
      { 
        opacity: 0,
        scale: 0.96,
        y: 15 
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

  // Animación del campo de búsqueda
  if (searchRef.current) {
    gsap.fromTo(
      searchRef.current,
      { 
        opacity: 0,
        scale: 0.92,
        y: 25 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.4,
        delay: 0.2,
        ease: "back.out(1.6)"
      }
    );

    // Efecto focus en búsqueda
    searchRef.current.addEventListener("focus", () => {
      gsap.to(searchRef.current, {
        scale: 1.02,
        boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)",
        duration: 0.2,
        ease: "power2.out"
      });
    });
    
    searchRef.current.addEventListener("blur", () => {
      gsap.to(searchRef.current, {
        scale: 1,
        boxShadow: "none",
        duration: 0.2,
        ease: "power2.out"
      });
    });
  }

  // Animación de estadísticas
  if (statsRef.current.length > 0) {
    gsap.fromTo(
      statsRef.current,
      { 
        opacity: 0,
        scale: 0.85,
        y: 20 
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0, 
        duration: 0.45,
        stagger: 0.08,
        delay: 0.3,
        ease: "back.out(1.5)"
      }
    );

    // Efecto hover en estadísticas
    statsRef.current.forEach((stat) => {
      if (stat) {
        stat.addEventListener("mouseenter", () => {
          gsap.to(stat, {
            scale: 1.08,
            duration: 0.15,
            ease: "power2.out"
          });
        });
        
        stat.addEventListener("mouseleave", () => {
          gsap.to(stat, {
            scale: 1,
            duration: 0.15,
            ease: "power2.out"
          });
        });
      }
    });
  }

  // Animación de las cards de usuarios
  if (cardsRef.current.length > 0) {
    gsap.fromTo(
      cardsRef.current,
      { 
        opacity: 0,
        y: 30,
        scale: 0.94 
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1, 
        duration: 0.5,
        stagger: 0.05,
        delay: 0.5,
        ease: "power3.out"
      }
    );

    // Efecto hover en cards
    cardsRef.current.forEach((card) => {
      if (card) {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            duration: 0.2,
            ease: "power2.out"
          });
          
          // Resaltar el nombre del usuario
          const nombreElement = card.querySelector('.group-hover\\:text-orange-300');
          if (nombreElement) {
            gsap.to(nombreElement, {
              color: "#fdba74", // orange-300
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
          
          const nombreElement = card.querySelector('.group-hover\\:text-orange-300');
          if (nombreElement) {
            gsap.to(nombreElement, {
              color: "#ffffff",
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      }
    });

    // Efecto especial para usuarios activos (pulso suave)
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const isActive = card.querySelector('.bg-green-900\\/40');
        if (isActive) {
          gsap.to(card, {
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.1)",
            duration: 0.5,
            delay: 0.8 + (index * 0.02),
            repeat: 1,
            yoyo: true,
            ease: "power2.inOut"
          });
        }
      }
    });
  }

  // Efecto de conteo en el número de resultados
  const resultsElement = document.querySelector('.text-gray-400.text-sm');
  if (resultsElement) {
    gsap.fromTo(
      resultsElement,
      { 
        opacity: 0,
        scale: 0.9 
      },
      { 
        opacity: 1,
        scale: 1, 
        duration: 0.4,
        delay: 0.7,
        ease: "power2.out"
      }
    );
  }

  // Animación de los botones de filtro
  const filterButtons = document.querySelectorAll('button[class*="bg-gradient-to-r"]');
  if (filterButtons.length > 0) {
    gsap.fromTo(
      filterButtons,
      { 
        opacity: 0,
        y: 15 
      },
      { 
        opacity: 1,
        y: 0, 
        duration: 0.3,
        stagger: 0.1,
        delay: 0.4,
        ease: "power2.out"
      }
    );

    // Efecto hover en botones de filtro
    filterButtons.forEach((button) => {
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
    });
  }
};