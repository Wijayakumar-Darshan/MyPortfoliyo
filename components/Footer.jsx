"use client"

import isMobile from "is-mobile";
import React from "react";
import { motion } from "framer-motion";
import social from "@/data/social";
import MotionBtn from "./MotionBtn";
import Link from "next/link";

const Footer = () => {
  const containerVariant = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const viewportMargin = isMobile()
    ? "-10% 0px -10% 0px" // For mobile devices
    : "-10% 0px -5% 0px"; // For larger screens

  return (
    <footer className="min-h-16 overflow-hidden bg-[#193432cc] shadow-lg">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: viewportMargin }}
        variants={containerVariant}
        className="container mx-auto py-8 lg:py-6"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
          {/* Copyright Text */}
          <motion.div
            variants={itemVariant}
            className="text-sm text-center lg:text-left"
          >
            © 2025 Wijayakumar Darshan. All rights reserved.
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariant}
            className="flex gap-4 lg:gap-6 px-4"
          >
            {social.map((item, index) => (
              <MotionBtn
                key={index}
                variants={itemVariant}
                custom={index}
                whileHover={{ 
                  rotate: 360, 
                  scale: 1.2,
                  transition: { 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 400,
                    damping: 10 
                  }
                }}
              >
                <Link 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 border-[1.5px] border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary transition-all duration-300"
                  aria-label={item.name}
                >
                  {item.icon}
                </Link>
              </MotionBtn>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;