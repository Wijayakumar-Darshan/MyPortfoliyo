"use client";

import Image from "next/image";
import { animate, motion } from "framer-motion";
import isMobile from "is-mobile";
import React from "react";

const CertificatesSubSection = () => {
  const certificates = [
    {
      name: "Web Design for Beginners",
      issuedBy: "University of Moratuwa, Sri Lanka",
      date: "2025 Feb 03",
      image: "/assets/certificates/WebDev.jpg",
      link: "https://open.uom.lk/lms/mod/customcert/view.php?id=697&downloadown=1",
      verificationCode: "SqqtgYndYC",
    },
    {
      name: "Python for Beginners",
      issuedBy: "University of Moratuwa, Sri Lanka",
      date: "2023 Feb 08",
      image: "/assets/certificates/PythonCer.jpg",
      link: "https://open.uom.lk/lms/mod/customcert/view.php?id=675&downloadown=1",
      verificationCode: "6HyKw6pJOZ",
    },
  ];

  const viewportMarginH1 = isMobile()
    ? "-40% 0px -25% 0px" // For mobile devices
    : "-15% 0px -25% 0px"; // For larger screens

  const viewportMarginP = isMobile()
    ? "-40% 0px -40% 0px" // For mobile devices
    : "-50% 0px -50% 0px"; // For larger screens

  const containerVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity:1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }  

  const imageVariant = {
    initial: {
      y: 100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
  }

  const titleVariant = {
    initial: {
      y: -100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  }

  const contentVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    }
  }

  return (
    <section>
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
        Certificates
      </motion.h1>
      <div className="flex flex-col gap-8 p-2">
        {certificates.map((cert, index) => (
          <motion.div
            variants={containerVariant}
            initial='initial'
            whileInView='animate'
            viewport={{
              margin: viewportMarginP
            }}
            key={index}
            className="flex flex-col lg:flex-row gap-4 p-4 bg-[#193432cc] rounded-md group"
          >
            <motion.div variants={imageVariant} className="w-full lg:min-w-96 lg:max-w-96 rounded-md">
              <Image
                src={cert.image}
                alt={cert.name}
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-md lg:brightness-90 lg:group-hover:brightness-100"
              />
            </motion.div>
            <div>
              <motion.h2 variants={titleVariant} className="text-lg lg:text-2xl font-semibold text-accent">
                {cert.name}
              </motion.h2>
              <motion.div variants={contentVariant}>
              <div className="py-4 lg:py-8">
                <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-center py-2 lg:py-1">
                  <div className="text-sm opacity-80">Issued by:</div>
                  <div className="leading-tight">{cert.issuedBy}</div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-center py-2 lg:py-1">
                  <div className="text-sm opacity-80">Date:</div>
                  <div className="leading-tight">{cert.date}</div>
                </div>
                {cert.verificationCode && (
                  <div className="flex flex-col lg:flex-row lg:gap-2 lg:items-center py-2 lg:py-1">
                    <div className="text-sm opacity-80">Verification Code:</div>
                    <div className="leading-tight">{cert.verificationCode}</div>
                  </div>
                )}
              </div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent bg-opacity-90 lg:hover:bg-accent-hover text-primary px-4 py-1 rounded-full cursor-none"
                >
                  Certificate Link
                </a>
              )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CertificatesSubSection;
