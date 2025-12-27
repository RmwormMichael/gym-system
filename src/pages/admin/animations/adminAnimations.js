// src/components/admin/animations/adminAnimations.js
import gsap from "gsap";

export const initAdminAnimations = (containerRef, tabsRef, contentRef) => {
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

  // Animar tabs
  tabsRef.current.forEach((tabEl, index) => {
    if (tabEl) {
      gsap.fromTo(
        tabEl,
        { 
          opacity: 0, 
          x: -20,
          scale: 0.8 
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
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
        y: 20 
      },
      { 
        opacity: 1,
        y: 0, 
        duration: 0.7, 
        ease: "power3.out" 
      }
    );
  }
};

export const animateTabChange = (contentRef, onComplete) => {
  if (!contentRef.current) {
    onComplete();
    return;
  }

  // Animación de salida
  gsap.to(contentRef.current, {
    opacity: 0,
    y: -10,
    scale: 0.98,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      // Llamar al callback para cambiar el tab
      onComplete();
      
      // Pequeño delay para asegurar que el nuevo contenido se renderice
      setTimeout(() => {
        // Animación de entrada del nuevo contenido
        gsap.fromTo(
          contentRef.current,
          { 
            opacity: 0,
            y: 10,
            scale: 0.98 
          },
          { 
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          }
        );
      }, 50);
    }
  });
};