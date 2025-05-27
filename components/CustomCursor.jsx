"use client";

import gsap from "gsap";
import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    // Cursor movement
    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, { x: clientX, y: clientY, duration: 0.2 });
    };

    // Link hover effects
    const onMouseEnterLink = (event) => {
      gsap.to(cursor, { scale: 3, delay: 0.1 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1 });
    };

    // White text hover effects
    const onMouseEnterWhiteText = () => {
      cursor.style.backgroundColor = "transparent";
      cursor.style.border = "2px solid #01ffbb";
      cursor.style.mixBlendMode = "normal";
    };

    const onMouseLeaveWhiteText = () => {
      cursor.style.backgroundColor = "#01ffbb";
      cursor.style.border = "none";
      cursor.style.mixBlendMode = "difference";
    };

    // Attach global mousemove event
    document.addEventListener("mousemove", onMouseMove);

    // Select elements and attach listeners
    const linkElements = document.querySelectorAll("a");
    linkElements.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });

    const whiteTextElements = document.querySelectorAll(".w");
    whiteTextElements.forEach((text) => {
      text.addEventListener("mouseenter", onMouseEnterWhiteText);
      text.addEventListener("mouseleave", onMouseLeaveWhiteText);
    });

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("mousemove", onMouseMove);

      linkElements.forEach((link) => {
        link.removeEventListener("mouseenter", onMouseEnterLink);
        link.removeEventListener("mouseleave", onMouseLeaveLink);
      });

      whiteTextElements.forEach((text) => {
        text.removeEventListener("mouseenter", onMouseEnterWhiteText);
        text.removeEventListener("mouseleave", onMouseLeaveWhiteText);
      });
    };
  }, []);

  return <div id="custom-cursor" className="custom-cursor hidden lg:flex" />;
};

export default CustomCursor;
