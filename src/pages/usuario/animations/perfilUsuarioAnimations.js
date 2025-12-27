// src/components/cliente/animations/perfilUsuarioAnimations.js
import gsap from "gsap";

export const initPerfilUsuarioAnimations = (containerRef, tabsRef, contentRef) => {
  // Animación de entrada del container
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

  // Animación de tabs con efecto de onda
  tabsRef.current.forEach((tabEl, index) => {
    if (tabEl) {
      gsap.fromTo(
        tabEl,
        { 
          opacity: 0, 
          scale: 0.85,
          y: -15,
          rotation: -5 
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.5,
          delay: index * 0.12,
          ease: "back.out(1.8)",
        }
      );
    }
  });

  // Animación de contenido inicial
  if (contentRef.current) {
    gsap.fromTo(
      contentRef.current,
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
        ease: "power3.out",
        delay: 0.4
      }
    );
  }

  // Efecto hover especial en tabs
  tabsRef.current.forEach((tabEl) => {
    if (tabEl) {
      tabEl.addEventListener("mouseenter", () => {
        gsap.to(tabEl, {
          scale: 1.08,
          duration: 0.2,
          ease: "power2.out"
        });
      });
      
      tabEl.addEventListener("mouseleave", () => {
        if (!tabEl.classList.contains('bg-gradient-to-r')) {
          gsap.to(tabEl, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    }
  });
};

export const animateTabChange = (contentRef, onComplete) => {
  if (!contentRef.current) {
    onComplete();
    return;
  }

  // Animación de salida con efecto de desvanecimiento
  gsap.to(contentRef.current, {
    opacity: 0,
    scale: 0.98,
    y: 5,
    duration: 0.25,
    ease: "power2.in",
    onComplete: () => {
      onComplete();
      
      setTimeout(() => {
        // Animación de entrada con efecto de resorte suave
        gsap.fromTo(
          contentRef.current,
          { 
            opacity: 0,
            scale: 0.98,
            y: 10 
          },
          { 
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.35,
            ease: "back.out(1.3)"
          }
        );
      }, 20);
    }
  });
};