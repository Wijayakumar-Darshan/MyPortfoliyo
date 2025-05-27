"use client"

import { motion } from "framer-motion";
import isMobile from "is-mobile";
import React from "react";

const Service = () => {
  const services = [
    {
      title: "Front-End Development",
      description:
        "Crafting responsive, user-friendly, and visually engaging interfaces using React and Next.js. Expertise in building modern, fast, and SEO-friendly web applications with cutting-edge technologies like HTML, CSS, and JavaScript.",
      variant: {
        initial: {
          opacity: 0,
          y: -50,
          x: -50,
        }
      }
    },
    {
      title: "Back-End Development",
      description:
        "Developing robust, scalable, and secure server-side solutions using Next.js, Node.js, Express, MongoDB, SQL, Spring Boot, and ASP.NET. Expertise in creating RESTful APIs, managing databases, and implementing backend logic for complex systems.",
      variant: {
        initial: {
          opacity: 0,
          y: -50,
          x: 50,
        }
      }
    },
    {
      title: "Testing",
      description:
        "Ensuring software reliability through comprehensive testing strategies, including unit testing, integration testing, and end-to-end testing.",
      variant: {
        initial: {
          opacity: 0,
          y: 50,
          x: -50,
        }
      }
    },
    {
      title: "Bug Fixing",
      description:
        "Diagnosing and resolving software issues efficiently to enhance performance and maintain seamless functionality.",
      variant: {
        initial: {
          opacity: 0,
          y: 50,
          x: 50,
        }
      }
    },
  ];

  const viewportMarginH1 = isMobile()
    ? "-25% 0px -25% 0px" // For mobile devices
    : "-15% 0px -25% 0px"; // For larger screens

  const viewportMarginP = isMobile()
    ? "-40% 0px -25% 0px" // For mobile devices
    : "-30% 0px -30% 0px"; // For larger screens

  return (
    <div className="container mx-auto lg:pt-[120px]">
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
        className="pb-4 lg:pb-0 text-2xl font-semibold"
      >
        Services
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:pt-8 xl:pb-8 gap-4 h-full overflow-hidden">
        {services.map((service, index) => (
          <motion.div
            variants={service.variant}
            initial='initial'
            whileInView={{
              opacity: 1,
              y: 0,
              x: 0,
              transition: {
                duration: 0.3,
              },
            }}
            viewport={{
              margin: viewportMarginP,
              //once: true,
            }}
            key={index}
            className="w-full bg-accent bg-opacity-80 rounded-md text-primary h-fit md:min-h-[35vh] lg:max-h-[35vh] py-4 px-6 hover:bg-accent-hover hover:shadow-md"
          >
            <h2 className="text-xl pb-2 font-semibold">{service.title}</h2>
            <p className="text-base py-2">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;
