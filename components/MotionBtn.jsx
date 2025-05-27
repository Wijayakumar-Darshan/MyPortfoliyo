"use client";

import { motion } from "framer-motion";

const MotionBtn = ({
  children,
  whileHover = { scale: 1.1 }, // Default rotation
  whileTap = { scale: 0.95 }, // Default tap effect
  transition = { type: "spring", stiffness: 400, damping: 10 }, // Customizable transition
  ...motionProps
}) => {
  return (
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition} // Apply transition for animation speed
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default MotionBtn;
