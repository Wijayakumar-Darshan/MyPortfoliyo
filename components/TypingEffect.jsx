/* "use client";

import { motion } from "framer-motion";

const TypingEffect = () => {
  // Text to animate
  const text = "Buddika Kasun";
  const letters = text.split("");

  // Define animation for typing and backspace effect
  const letterVariants = {
    typing: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.1, // typing duration
        ease: "easeIn",
      },
    },
    backspace: {
      opacity: 0,
      x: -10, // Move letters slightly left while deleting
      transition: {
        duration: 0.1, // backspace duration
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative">
      {/* Typing effect container *}
      <motion.div
        className="text-4xl font-semibold inline-block"
        initial="backspace" // Start with backspace effect
        animate="typing"
        variants={{
          typing: {
            transition: {
              delayChildren: 0.5, // Slight delay before starting typing
              staggerChildren: 0.1, // Stagger typing effect for each letter
              repeat: Infinity, // Repeat infinitely
              repeatType: "loop", // Loop the animation
            },
          },
        }}
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            //initial="backspace" // Start each letter with the backspace animation
            initial={{ opacity: 0, y: 100}} // Start each letter with the backspace animation
            //animate="typing"    // Then animate typing
            animate={{opacity: 1, y: 0}}    // Then animate typing
            //exit="backspace"     // Backspace effect when the letter exits
            exit={{opacity: 0, y: 100, transition: 0.15}}
            transition={{
              duration: 0.2, // Make the typing more noticeable
              ease: "easeOut",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Typing cursor *}
      <motion.span
        className="relative bottom-0 left-0 text-4xl font-semibold"
        animate={{
          opacity: [1, 0, 1], // Fade in and out for blinking effect
        }}
        transition={{
          duration: 0.7,
          repeat: Infinity,
          repeatType: "loop", // Make it repeat indefinitely
          ease: "easeInOut",
        }}
      >
        |
      </motion.span>
    </div>
  );
};

export default TypingEffect;
 */

// v2

/*
"use client";

import { motion } from "framer-motion";

const TypingEffect = () => {
  const text = "Buddika Kasun"; // Text to animate
  const letters = text.split(""); // Split the text into an array of letters

  // Animation variants for typing and backspacing
  const letterVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
  };

  // Container variant to handle staggered typing and deleting
  const containerVariants = {
    typing: {
      transition: {
        staggerChildren: 0.1, // Delay between typing each letter
      },
    },
    deleting: {
      transition: {
        staggerChildren: 0.1, // Delay between deleting each letter
        staggerDirection: -1, // Reverse order for deleting
      },
    },
  };

  return (
    <div className="flex items-center">
      <motion.div
        className="text-4xl font-semibold inline-block"
        initial="typing"
        animate="deleting"
        variants={containerVariants}
        transition={{
          repeat: Infinity, // Loop the animation
          repeatType: "mirror", // Alternate between typing and deleting
          duration: 4, // Full cycle duration
        }}
      >
        {letters.map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.div>

      <motion.span
        className="text-4xl font-semibold ml-1"
        animate={{ opacity: [1, 0, 1] }} // Blink effect
        transition={{
          duration: 0.7, // Speed of blinking
          repeat: Infinity, // Infinite blinking
        }}
      >
        |
      </motion.span>
    </div>
  );
};

export default TypingEffect;

*/

"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const TypingEffect = () => {
  return (
    <TypeAnimation
      sequence={[
        "Front End Developer",
        1000,
        "Back End Developer",
        1000,
        "Full Stack Developer",
        1000,
        "Tester",
        1000,
        "Bug Fixer",
        1000,
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
  );
};

export default TypingEffect;
