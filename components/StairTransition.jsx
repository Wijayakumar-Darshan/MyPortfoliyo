"use client";

import { AnimatePresence, delay, motion } from "framer-motion";
//import { usePathname } from 'next/navigation';

// Components
import Stair from "./Stair";

const StairTransition = () => {
  //const pathName = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <div>
          <div
            className="h-screen w-screen fixed left-0 right-0 pointer-events-none z-40 flex top-0 lg:top-20" /* top-0 */
          >
            <Stair />
          </div>

          {/*<motion.div
                        className='h-screen w-screen fixed bg-primary pointer-events-none top-0 lg:top-20'
                        initial={{opacity: 1}}
                        animate={{opacity: 0, transition: {
                            delay: 0,
                            duration: 0.4,
                            ease: 'easeInOut',
                        }}}
                    /> */}
        </div>
      </AnimatePresence>
    </>
  );
};

export default StairTransition;
