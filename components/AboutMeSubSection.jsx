"use client"

import TextShadingView from "@/app/animations/TextShadingView";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import isMobile from "is-mobile";

const AboutMeSubSection = () => {

  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  const aboutMeDetails = [
    {
      title: "Name",
      description: "Wijayakumar Darshan",
    },
    {
      title: "Nationality",
      description: "Sri Lankan",
    },
    {
      title: "Phone",
      description: "+94 76 454 5369",
    },
    {
      title: "Email",
      description: "darshanwijayakumar0@gmail.com",
    },
    {
      title: "Address",
      description: "No: 218/14, Mahawatta, Opatha, Kotugoda, Sri Lanka",
    },
    {
      title: "Languages",
      description: "English, Sinhala, Tamil",
    },
  ];

  const viewportMarginH1 = isMobile()
    ? "-40% 0px -25% 0px" // For mobile devices
    : "-15% 0px -25% 0px"; // For larger screens

  const viewportMarginP = isMobile()
    ? "-40% 0px -25% 0px" // For mobile devices
    : "-20% 0px -25% 0px"; // For larger screens

  return (
    <section className="relative">
      <motion.h1
        initial={{
          opacity: 0,
          y: -50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
          },
        }}
        viewport={{
          margin: viewportMarginH1,
          //once: true,
        }}
        className="text-2xl font-semibold pb-4"
      >
        About Me
      </motion.h1>
      <div className="py-4 opacity-80">
        <TextShadingView>
          A passionate software engineering undergraduate with a love for
          technology, web development, and SE projects.
        </TextShadingView>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 p-4">
        {aboutMeDetails.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col leading-normal lg:flex-row lg:items-center lg:gap-3 pr-8 overflow-hidden"
            /* whileInView={{
              opacity: 1,
              x: 0,
            }}
            initial={{
              opacity: 0,
              x: -50, // Adjust this value to set the starting position (from the left)
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.2, // Stagger animations for each detail
            }}
            viewport={{ once: true }} */ // Trigger the animation only once when in view
          >
            <motion.p
              className="opacity-60"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: {
                  duration: 0.4,
                  //delay: index * 0.2,
                }
              }}
              viewport={{margin: viewportMarginP}}
            >
              {item.title}:
            </motion.p>
            <motion.p
              className="text-lg font-semibold"
              initial={{
                x: 100, // Starts slightly off-screen from the right
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: 0.6,
                  //delay: index * 0.2, // Matches the delay for the title
                }
              }}
              viewport={{margin: viewportMarginP}}
            >
              {item.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutMeSubSection;
