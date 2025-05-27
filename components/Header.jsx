/* import Link from "next/link";

// Components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import HireMeBtn from "./HireMeBtn";

const Header = () => {

  return (
    <header className="py-6 w-full px-8 mx-auto text-white fixed z-20 transition-colors duration-300 ease-in-out">
        <div className="flex justify-between items-center">

            {/* Logo *}
            <Link href="/" className="cursor-none">
                <h1 className="text-4xl font-semibold hover:text-shadow-white w">
                    Darshan<span className="text-accent">.</span>
                </h1>
            </Link>

            {/* Desktop nav & Hire me button *}
            <div className="hidden xl:flex items-center gap-8">
                <Nav />
                <HireMeBtn />
            </div>

            {/* Mobile nav *}
            <div className="xl:hidden">
                <MobileNav />
            </div>
        </div>
    </header>
  )
}

export default Header; */

//  v2
"use client"
// Components
import Link from "next/link";
import Logo from "./Logo";
//import Nav from "./Nav";
import dynamic from "next/dynamic";
const Nav = dynamic(() => import("./Nav"), {
  ssr: false,
});
import { useScroll, useSpring, motion } from "framer-motion";

const Header = () => {

  // Scroll progress using framer-motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const variant = {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Ensures smooth scrolling
    });
  };

  return (
    <header className="py-6 w-full px-8 mx-auto text-white fixed z-20 transition-colors duration-300 ease-in-out">
      
      {/* Global scroll progress bar */}
      <motion.div
        className="progress-bar-left fixed left-0 right-0 top-0 bg-accent h-[2px]"
        style={{ scaleX }}
      />

      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="cursor-none w">
          {/*<h1 className="text-4xl font-semibold hover:text-shadow-white">
             Darshan<span className="text-accent">.</span>
          </h1>*/}
          <Logo />
        </Link>

        {/* Nav & Hire me button */}
        <div className="flex items-center gap-8">
          <Nav />
        </div>
      </div>

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
          variants={variant}
        />
      </motion.svg>

    </header>
  );
};

export default Header;
