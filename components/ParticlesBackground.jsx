"use client";

import { useEffect } from "react";
import "particles.js";

const ParticlesBackground = () => {
  const delay = 1000;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize particles.js with the interactivity events enabled
      const initializeParticles = () => {
        window?.particlesJS("particles-js", {
          particles: {
            number: {
              value: 150,
              density: { enable: true, value_area: 1500 },
            },
            color: { value: "#00ff99" },
            shape: {
              type: "circle",
              stroke: { width: 2, color: "#00ff99" },
              polygon: { nb_sides: 5 },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" }, // Hover to trigger repulse
              onclick: { enable: true, mode: "push" }, // Click to push particles
              resize: true, // Resize event enabled
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: false,
        });
      };

      // Add delay before initializing particles
      const timer = setTimeout(initializeParticles, delay);

      // Handle click event to trigger push mode (click to add particles)
      const handleClick = (event) => {
        const par = { pos_x: event.clientX, pos_y: event.clientY };
        const particalCount = 4;

        if (window?.pJSDom && window?.pJSDom.length > 0) {
          const particlesInstance = window?.pJSDom[0].pJS;
          particlesInstance.fn.modes.pushParticles(particalCount, par);
          particlesInstance.fn.modes.removeParticles(particalCount);
        }
      };

      // Handle mousemove event for repulse
      const handleMouseMove = (event) => {
        if (window?.pJSDom && window?.pJSDom.length > 0) {
          const particlesInstance = window?.pJSDom[0].pJS;
          if (particlesInstance) {
            const canvas = particlesInstance.canvas.el;
            const rect = canvas.getBoundingClientRect();

            const par = {
              pos_x:
                (event.clientX - rect.left) * particlesInstance.canvas.pxratio,
              pos_y:
                (event.clientY - rect.top) * particlesInstance.canvas.pxratio,
            };

            particlesInstance.interactivity.mouse.pos_x = par.pos_x;
            particlesInstance.interactivity.mouse.pos_y = par.pos_y;
            particlesInstance.interactivity.status = "mousemove";
          }
        }
      };

      // Cleanup interactivity when mouse leaves the canvas
      const handleMouseLeave = () => {
        if (window?.pJSDom && window?.pJSDom.length > 0) {
          const particlesInstance = window?.pJSDom[0].pJS;
          if (particlesInstance) {
            particlesInstance.interactivity.mouse.pos_x = null;
            particlesInstance.interactivity.mouse.pos_y = null;
            particlesInstance.interactivity.status = "mouseleave";
          }
        }
      };

      // Add event listeners for mousemove and mouseleave
      window?.addEventListener("mousemove", handleMouseMove);
      window?.addEventListener("mouseleave", handleMouseLeave);

      // Add event listeners for click
      window?.addEventListener("click", handleClick);

      // Cleanup event listeners on component unmount
      return () => {
        clearTimeout(timer);
        window?.removeEventListener("mousemove", handleMouseMove);
        window?.removeEventListener("mouseleave", handleMouseLeave);
        window?.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return <div id="particles-js" />;
};

export default ParticlesBackground;
