"use client";

import { AnimatePresence, motion } from "framer-motion";
// import { usePathname } from "next/navigation";

// Components
import StairTransition from "./StairTransition";

const PageTransition = () => {
  //const pathName = usePathname();

  return (
    <>
      <StairTransition />

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
          }}
          className="h-screen w-screen absolute bg-primary pointer-events-none top-0 left-0 z-[-1]" /* top-0 */
        />
      </AnimatePresence>
    </>
  );
};

export default PageTransition;
