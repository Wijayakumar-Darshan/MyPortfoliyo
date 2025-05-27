"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const CustomScrollLayout = ({ children }) => {
  const containerRef = useRef(null);

  let container = null;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    container = window;
  }, []); 

  // Scroll progress using framer-motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Scroll to the top of the container
  /* const scrollToTop = () => {
    //containerRef.current.scrollTop = 0;
    containerRef.current.scrollTo({
      top: 0,
      behavior: "smooth", // Ensures smooth scrolling
    });
  }; */
  const scrollToTop = () => {
    container?.scrollTo({
      top: 0,
      behavior: "smooth", // Ensures smooth scrolling
    });
  };

  const varient = {
    initial: {
      y: 0,
      scale: 1,
    },
    hover: {
      y: [5, -2],
      scale: 1.1,
      transition: {
        delay: 0.5,
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        type: "spring",
        stiffness: 300,
        damping: 6,
      },
    },
  };

  return (
    <div
      id="main-container"
      //ref={containerRef}
      //className="lg:max-h-[100vh] overflow-auto"
      className="z-50"
    >
      {/* Global scroll progress bar */}
      {/* <motion.div
        className="progress-bar-left fixed left-0 right-0 top-0 bg-accent h-[2px]"
        style={{ scaleX }}
      /> */}

      {/* {children} */}

      <motion.svg
        className="fixed bottom-2 right-2 lg:right-5 w-20 h-20 z-50"
        viewBox="0 0 100 100"
        onClick={scrollToTop}
        initial="initial"
        whileHover="hover"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="stroke-accent circle"
          style={{ pathLength: scaleX }}
        />

        {/* Up Arrow Icon */}
        <motion.path
          //d="M50 40 L50 60 M45 40 L60 52 M40 52 L55 40"
          d="M50 42V60M41 48l9-7 9 7"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="stroke-accent opacity-0 transition-opacity ease-in-out duration-500"
          id="upArrow"
          variants={varient}
        />
      </motion.svg>
    </div>
  );
};

export default CustomScrollLayout;
