"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="h-full w-full relative z-10 group flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 0.4,
            ease: "easeIn",
          },
        }}
        className="relative rounded-full overflow-hidden"
      >
        {/* Animated Circles */}
        <motion.svg
          className="w-[300px] h-[300px] xl:w-[380px] xl:h-[380px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#01ffbb"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            whileInView={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <motion.circle
            cx="253"
            cy="253"
            r="230"
            stroke="#01ffbb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            whileInView={{
              strokeDasharray: ["2 255 15 5", "12 22 55 42"],
              rotate: [90, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />

          <motion.circle
            cx="253"
            cy="253"
            r="290"
            stroke="#01ffbb"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            whileInView={{
              strokeDasharray: ["2 255 15 5", "2 155 95 15"],
              rotate: [90, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.svg>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: {
              delay: 1,
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.05 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 10,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-[260px] h-[260px] xl:w-[330px] xl:h-[330px] rounded-full overflow-hidden border-4 border-transparent group-hover:border-[#01ffbb] transition-all duration-300">
            <Image
              src="/assets/dp/my photo.jpg"
              priority
              quality={100}
              fill
              alt="Profile Photo"
              className="object-cover"
              sizes="(max-width: 768px) 260px, 330px"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;
