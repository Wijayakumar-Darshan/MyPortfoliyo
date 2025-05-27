"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import MotionBtn from "@/components/MotionBtn";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Project = () => {
  const projects = [
    {
      title: "Hotel Management System",
      image: "/assets/projects/Hotel.png",
      description: "A modern, full-stack management platform offering seamless experiences with features like user authentication, employee management, event management, travel management, and food management.",
      link: "",
      git: "https://github.com/Wijayakumar-Darshan/Hotel"
    },
    {
      title: "My Portfolio", 
      image: "/assets/projects/Portfoliyo.png",
      description: "A sleek and responsive personal portfolio built with Next.js 15, React 19, and Tailwind CSS. Showcases projects, skills, and experiences with smooth animations powered by Framer Motion.",
      link: "",
      git: "https://github.com/Wijayakumar-Darshan/Portfoliyo"
    },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 1024);
      };
      
      // Set initial value
      handleResize();
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      id="projects"
      ref={containerRef}
      className="relative py-20 lg:py-32 px-4 lg:px-8 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-5xl font-bold mb-12 lg:mb-20 text-center text-accent"
        >
          My Projects
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-16 lg:gap-24"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${!isMobile && index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <motion.div
                variants={imageVariants}
                whileHover="hover"
                className="w-full lg:w-1/2 rounded-xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={project.image}
                  width={800}
                  height={500}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <motion.h3 
                  className="text-2xl lg:text-3xl font-bold mb-4 text-accent"
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-white/80 mb-6 leading-relaxed"
                >
                  {project.description}
                </motion.p>

                <motion.div className="flex gap-4">
                  {project.link && (
                    <Link
                      href={project.link}
                      target="_blank"
                      className="px-6 py-2 bg-accent text-primary rounded-lg font-medium hover:bg-accent-hover transition-all duration-300"
                    >
                      View Live
                    </Link>
                  )}
                  
                  <MotionBtn
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <Link 
                      href={project.git} 
                      target="_blank" 
                      className="w-10 h-10 border-2 border-accent rounded-full flex justify-center items-center text-accent text-lg hover:bg-accent hover:text-primary transition-all duration-300"
                    >
                      <FaGithub />
                    </Link>
                  </MotionBtn>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
