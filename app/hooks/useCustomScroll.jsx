"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const useCustomScroll = ({ sectionsClassName = "section" } = {}) => {
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [enteredSection, setEnteredSection] = useState({});
  const [leavedSection, setLeavedSection] = useState({});
  const [activeSection, setActiveSection] = useState("home");
  const [sectionProgress, setSectionProgress] = useState({ home: 0.99 });
  const [subSectionProgress, setSubSectionProgress] = useState({});
  const [scrollYProgress, setScrollYProgress] = useState(0);
  
  // Store observers in refs to avoid recreating them
  const enterObserverRef = useRef(null);
  const leaveObserverRef = useRef(null);

  // Memoize calculation functions
  const calculateProgress = useCallback(() => {
    const sections = Array.from(document.getElementsByClassName(sectionsClassName));
    const progressData = {};

    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, windowHeight);

      if (visibleTop >= visibleBottom) {
        progressData[section.id] = 0;
        return;
      }

      const visibleHeight = visibleBottom - visibleTop;
      const sectionHeight = rect.height;

      const progress = sectionHeight === 0 ? 0 : Math.min(visibleHeight / windowHeight, 0.99);
      progressData[section.id] = Math.min(Math.max(progress, 0), 1);
    });

    setSectionProgress(progressData);
  }, [sectionsClassName]);

  const handleScrollDirection = useCallback(() => {
    const currentScrollPosition = document.documentElement.scrollTop;

    if (currentScrollPosition > lastScrollPosition) {
      setScrollDirection("down");
    } else if (currentScrollPosition < lastScrollPosition) {
      setScrollDirection("up");
    }

    setLastScrollPosition(currentScrollPosition);
  }, [lastScrollPosition]);

  const handleScrollHeader = useCallback(() => {
    const header = document.querySelector("header");
    if (document.documentElement.scrollTop > 0) {
      header?.classList.add("bg-[#193432cc]", "shadow-lg");
    } else {
      header?.classList.remove("bg-[#193432cc]", "shadow-lg");
    }
  }, []);

  const calScrollYProgress = useCallback(() => {
    const container = document.documentElement;
    const section = container.querySelector(`.${sectionsClassName}`);
    if (!section) return;

    const containerHeight = container.scrollHeight - container.clientHeight;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    const sectionScrollTop = Math.max(0, container.scrollTop - sectionTop);
    const sectionProgress = Math.min(1, sectionScrollTop / sectionHeight);

    setScrollYProgress(sectionProgress);
  }, [sectionsClassName]);

  const handleUpArrow = useCallback(() => {
    const upArrow = document.getElementById("upArrow");
    if (document.documentElement.scrollTop > 10) {
      upArrow?.classList.remove("opacity-0");
      upArrow?.classList.add("opacity-100");
    } else {
      upArrow?.classList.remove("opacity-100");
      upArrow?.classList.add("opacity-0");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    // Initialize observers
    enterObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEnteredSection(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.04 }
    );

    leaveObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setLeavedSection(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.94 }
    );

    const sections = document.querySelectorAll(`.${sectionsClassName}`);
    sections.forEach((section) => {
      enterObserverRef.current?.observe(section);
      leaveObserverRef.current?.observe(section);
    });

    // Throttle scroll events for better performance
    const scrollListener = () => {
      handleScrollDirection();
      calculateProgress();
      handleScrollHeader();
      handleUpArrow();
      calScrollYProgress();
    };

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", calculateProgress);

    // Initial calculations
    calculateProgress();

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", calculateProgress);
      enterObserverRef.current?.disconnect();
      leaveObserverRef.current?.disconnect();
    };
  }, [
    handleScrollDirection,
    calculateProgress,
    handleScrollHeader,
    handleUpArrow,
    calScrollYProgress,
    sectionsClassName
  ]);

  // Update activeSection whenever sectionProgress changes
  useEffect(() => {
    if (Object.keys(sectionProgress).length === 0) return;

    const maxSectionName = Object.keys(sectionProgress).reduce(
      (maxName, section) =>
        sectionProgress[section] > sectionProgress[maxName] ? section : maxName,
      Object.keys(sectionProgress)[0]
    );

    setActiveSection(maxSectionName);
  }, [sectionProgress]);

  return {
    scrollDirection,
    lastScrollPosition,
    enteredSection,
    leavedSection,
    activeSection,
    sectionProgress,
    scrollYProgress,
    subSectionProgress,
  };
};

export default useCustomScroll;