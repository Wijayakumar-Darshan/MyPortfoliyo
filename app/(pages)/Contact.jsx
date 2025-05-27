"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import TextShadingView from "../animations/TextShadingView";

const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    value: "+94 764545369",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    value: "darshanwijayakumar0@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    value: "No:218/14, Mahawatta, Opatha, Kotugoda, Sri Lanka",
  },
];

const validationRules = {
  firstName: {
    regex: /^[A-Za-z.\s]*$/,
    error: "Only letters, spaces and dots allowed",
  },
  lastName: {
    regex: /^[A-Za-z.\s]*$/,
    error: "Only letters, spaces and dots allowed",
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    error: "Invalid email format",
  },
  phone: {
    regex: /^\+?[0-9]*$/,
    error: "Only numbers allowed",
  },
  subject: {
    regex: /^[A-Za-z0-9.\s]*$/,
    error: "Invalid characters in subject",
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // UPDATED: Remove immediate regex validation here
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Always update state with current input value
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear any existing error on that field
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (!validationRules.firstName.regex.test(formData.firstName)) {
      newErrors.firstName = validationRules.firstName.error;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!validationRules.lastName.regex.test(formData.lastName)) {
      newErrors.lastName = validationRules.lastName.error;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validationRules.email.regex.test(formData.email)) {
      newErrors.email = validationRules.email.error;
    }

    if (formData.phone && !validationRules.phone.regex.test(formData.phone)) {
      newErrors.phone = validationRules.phone.error;
    }

    if (formData.subject && !validationRules.subject.regex.test(formData.subject)) {
      newErrors.subject = validationRules.subject.error;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors", { position: "top-center" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Do NOT expose secrets with NEXT_PUBLIC_ on frontend!
        },
        body: JSON.stringify({
          ...formData,
          message: formData.message.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || "Failed to send message");
        } catch {
          throw new Error(errorText || `HTTP error! status: ${response.status}`);
        }
      }

      await response.json();
      toast.success("Message sent successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto lg:pt-[70px] mb-8 lg:mb-0">
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex-1">
          <form
            className="flex flex-col gap-4 p-6 bg-[#27272c50] rounded-xl"
            onSubmit={handleSubmit}
          >
            <motion.h3 variants={fadeInUp} className="text-3xl text-accent">
              Let&apos;s work together
            </motion.h3>

            <div className="text-white/60 text-sm">
              <TextShadingView as="span">
                I&apos;m here to help you achieve your goals. Let&apos;s connect and create
                a unique digital experience together.
              </TextShadingView>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["firstName", "lastName", "email", "phone"].map((field, i) => (
                <motion.div key={field} variants={i % 2 === 0 ? slideInLeft : slideInRight} className="flex flex-col">
                  <label htmlFor={field} className="text-sm text-white/70 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <Input
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    placeholder={
                      field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")
                    }
                  />
                  {errors[field] && (
                    <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div variants={slideInLeft} className="flex flex-col">
              <label htmlFor="subject" className="text-sm text-white/70 mb-1">Subject</label>
              <Input
                id="subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
              )}
            </motion.div>

            <motion.div variants={slideInRight} className="flex flex-col">
              <label htmlFor="message" className="text-sm text-white/70 mb-1">Message</label>
              <Textarea
                id="message"
                className="min-h-[100px]"
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
              <Button type="submit" className="w-full md:w-auto min-w-36" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.div>
          </form>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="flex-1 lg:pl-8">
          <motion.ul className="flex flex-col gap-8">
            {contactInfo.map((item, index) => (
              <motion.li key={index} variants={fadeInUp} custom={index} className="flex gap-4 items-center">
                <div className="min-w-[52px] h-[52px] bg-[#27272c60] text-accent rounded-md flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/60 text-sm">{item.title}</p>
                  <p className="text-base line-clamp-2">{item.value}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
