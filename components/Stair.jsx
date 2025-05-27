"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Variants
const stairAnimation = {
  initial: {
    top: "100%",
  },
  animate: {
    top: ["100%", "0%"],
  },
  exit: {
    top: ["0%", "100%"],
  },
};

const reverseIndex = (index) => {
  const totalSteps = 8;
  return totalSteps - index - 1;
};

const Stair = () => {
  const [isVisible, setIsVisible] = useState(true); // State to toggle visibility

  useEffect(() => {
    // Auto exit after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false); // Trigger exit animation by setting visibility to false
    }, 900); // Change the delay (in ms) as needed

    // Cleanup the timer when component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {[...Array(8)].map((_, index) => {
            return (
              <motion.div
                key={index}
                variants={stairAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  //delay: reverseIndex(index) * 0.1, // right to left
                  delay: index * 0.1, // left to right
                }}
                className="h-full w-full bg-accent-hover relative border border-primary"
              />
            );
          })}
        </>
      )}
    </AnimatePresence>
  );
};

export default Stair;
