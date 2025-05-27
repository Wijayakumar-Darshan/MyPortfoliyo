"use client"

import useCustomScroll from "@/app/hooks/useCustomScroll";
/* import dynamic from "next/dynamic";
const useCustomScroll = dynamic(() => import("@/app/hooks/useCustomScroll"), {
  ssr: false,
}); */

// ... rest of the code
import { Button } from "./ui/button";
import { animate, delay, motion, useInView } from "framer-motion";

const AboutNav = ({view}) => {
  const { sectionProgress, activeSection } = useCustomScroll({
    sectionsClassName: "aboutSubSection",
  }); //console.log(activeSection);

  const aboutItems = [
    {
      name: "About Me",
      path: "aboutMe",
    },
    {
      name: "Skills",
      path: "skills",
    },
    {
      name: "Certificate",
      path: "certificate",
    },
    {
      name: "Education",
      path: "education",
    },
  ];

  // Scroll handling for smooth navigation
  const onNavigate = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const variant = {
    initial: {
      opacity: 0,
      x: -50,
    },
    animate: {
      opacity: 1,
      x: 0,
      //transition: {
      //  duration: 1,
        //ease: "easeInOut",
      //},
      staggerChildren: 0.5,
    }
  };

  return (
    <nav className="grid grid-cols-2 gap-4 xl:flex xl:flex-col">
      {aboutItems.map((item, index) => (
        <motion.div
          key={index}
          variants={variant}
          initial='initial'
          /* whileInView='animate'
          viewport={{amount: 0.6}}
          exit={{
            opacity: 0,
            x: -50,
            transition: {
              duration: 0.5,
              ease: "easeInOut",
            },
          }} */
          animate={view ? 'animate' : 'initial'}
          transition={{
            //opacity: { duration: view ? 0.5 : 0.2 }, // Faster for initial
            //x: { duration: view ? 0.5 : 0.2 }, // Faster for initial
            delay: view && index * 0.2,
          }} 
        >
          <Button
            variants={variant}
            className={`${activeSection === item.path ? "bg-accent text-primary" : "bg-accent bg-opacity-20  text-white"} rounded-md lg:hover:text-primary w-full`} //lg:bg-[#38383dbb]
            onClick={() => onNavigate(item.path)}
          >
            {item.name}
          </Button>
        </motion.div>
      ))}
    </nav>
  );
};

export default AboutNav;
