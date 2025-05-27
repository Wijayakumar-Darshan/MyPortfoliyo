// v1 hover animation
/*
"use client"

import { motion } from "framer-motion";

const Logo = () => {
  // Split your text into an array of characters
  const text = "Darshan";
  const letters = text.split("");

  // Define animation variants
  const letterVariants = {
    initial: { y: 0 },
    hover: { y: -15, transition: { duration: 0.3 } },
  };

  return (
    <div className="pl-4 flex space-x-1 text-4xl font-semibold">
      {letters.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          initial="initial"
          whileHover="hover"
        >
          {char}
        </motion.span>
      ))}
      <span className="text-accent">.</span>
    </div>
  );
};

export default Logo;
*/

// v2 always animation
/*
"use client"

import { motion } from "framer-motion";

const Logo = () => {
  // Split your text into an array of characters
  const text = "Darshan";
  const letters = text.split("");

  // Define animation variants
  const letterVariants = {
    bounce: (i) => ({
      y: [0, -12, 0], // Bounces up and down
      transition: {
        duration: 1, // Total time for one bounce cycle
        repeat: Infinity, // Loop the animation
        delay: i * 0.15, // Stagger the animation for each letter
      },
    }),
  };

  return (
    <div className="pl-4 flex space-x-1 text-4xl font-semibold">
      {letters.map((char, index) => (
        <motion.span
          key={index}
          custom={index} // Pass index for staggered animation
          variants={letterVariants}
          animate="bounce"
        >
          {char}
        </motion.span>
      ))}
      <div className="text-accent">
        .
      </div>
    </div>
  );
};

export default Logo;
*/

//  v3
"use client";

import { motion } from "framer-motion";

const Logo = () => {
  // Split your text into an array of characters
  const text = "Darshan";
  const letters = text.split("");

  // Define animation for individual letters
  const letterVariants = {
    initial: { y: 0 }, // Default position
    hover: (i) => ({
      y: [0, -15, 0], // Bounce animation
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 10,
        delay: i * 0.1, // Staggered effect for each letter
      },
    }),
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -200,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        opacity: {
          delay: 1,
          duration: 1.5,
          ease: "easeInOut",
        },
        x: {
          delay: 1,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
          damping: 8,
        },
      }}
    >
      <motion.div
        className="pl-4 flex space-x-1 text-4xl font-semibold"
        initial="initial"
        animate="hover" // Trigger hover animation for all children
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            custom={index} // Pass index for staggered delay
            variants={letterVariants} // Apply letter-specific variants
          >
            {char}
          </motion.span>
        ))}
        <motion.span className="text-accent" variants={letterVariants}>
          .
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default Logo;
