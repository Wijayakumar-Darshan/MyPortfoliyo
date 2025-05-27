"use client"

import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import MotionBtn from "./MotionBtn";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

const ProjectItem = ({ item }) => {

    const ref = useRef(null);

    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    const textVariant = {
        initial: {
          opacity: 0,
          y: 500,
          x: 500,
        },
        animate: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            duration: 0.5,
            ease: "easeInOut",
            staggerChildren: 0.5,
          },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={textVariant}
            initial='initial'
            whileInView='animate'
            className="h-full min-w-full overflow-hidden flex flex-col lg:flex-row lg:gap-20 items-start  lg:justify-center lg:px-8 lg:pl-16"
        >
            <motion.div 
                variants={textVariant}
                className="w-full lg:min-w-[400px] lg:max-w-[400px] rounded-md"
            >
                <Image
                    src={item.image}
                    width={200}
                    height={200}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover rounded-md"
                />
            </motion.div>
            <motion.div 
                variants={textVariant}
                className="flex flex-col gap-4 p-2 lg:p-0"
            >
                <h2 className="text-lg lg:text-3xl font-semibold text-ellipsis line-clamp-2 leading-tight lg:leading-normal text-accent">
                    {item.title}
                </h2>
                <p className="lg:py-4 leading-tight lg:leading-normal">{item.description}</p>
                <div className="flex gap-6">
                    { 
                    item.link &&
                    <Link
                        href={item.link}
                        target="_blank"
                        className="bg-accent rounded-lg w-fit px-4 text-primary lg:hover:bg-accent-hover cursor-none"
                    >
                        View Project
                    </Link>
                    }
                    <MotionBtn
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{
                            duration: 0.5,
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                        }}
                    >
                    <Link href={item.git} target="_blank" className='w-9 h-9 border-[1.5px] border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500 cursor-none'>
                        <FaGithub />
                    </Link>
                    </MotionBtn>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectItem;