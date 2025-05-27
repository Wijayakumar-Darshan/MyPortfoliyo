"use client";

//import AboutMeSubSection from "@/components/AboutMeSubSection";
const AboutMeSubSection = dynamic(() => import("@/components/AboutMeSubSection"), {
  ssr: false,
});
import AboutNav from "@/components/AboutNav";
import CertificatesSubSection from "@/components/CertificatesSubSection";
import EducationSubSection from "@/components/EducationSubSection";
import SkillsSubSection from "@/components/SkillsSubSection";
import { motion, useInView } from "framer-motion";
import useCustomScroll from "../hooks/useCustomScroll";
import { useRef } from "react";
import dynamic from "next/dynamic";

const About = () => {
  const { sectionProgress } = useCustomScroll();

  const ref = useRef(null);
  
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" } ); //console.log(isInView)
  
  return (
      <div ref={ref} className="lg:container lg:mx-auto w-full relative ">
        <div className="flex flex-col xl:flex-row gap-5">
          {/* Menu */}
          <div
            className={`flex flex-col lg:max-w-80 lg:min-w-64 h-fit lg:mx-auto xl:mx-0 gap-6 sticky top-[87.5px] p-4 px-8 lg:p-0 xl:top-[20vh] xl:pt-[100px] z-10 ${sectionProgress.home == 0 && isInView && "bg-[#193432cc]"} lg:bg-transparent`}
          >
            <AboutNav view={isInView} />
          </div>

          {/* Content */}
          <div className="relative top-[-220px] xl:top-0 z-0 px-12 lg:px-0">
            <div className="aboutSubSection" id="aboutMe">
              <AboutMeSubSection />
            </div>

            <div className="aboutSubSection" id="skills">
              <SkillsSubSection />
            </div>

            <div className="aboutSubSection" id="certificate">
              <CertificatesSubSection />
            </div>

            <div className="aboutSubSection" id="education">
              <EducationSubSection />
            </div>
          </div>
        </div>
      </div>
  );
};

export default About;
