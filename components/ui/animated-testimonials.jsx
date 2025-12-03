"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [rotations, setRotations] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (autoplay && testimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  useEffect(() => {
    // Generate random rotations on client side only to avoid hydration mismatch
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
  }, [testimonials]);

  if (!isClient) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="animate-pulse bg-emerald-100 rounded-3xl w-full h-full"></div>
      </div>
    );
  }

  // Handle empty testimonials
  if (testimonials.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="animate-pulse bg-emerald-100 rounded-3xl w-full h-full"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto flex flex-col gap-5 antialiased font-sans">
      <div className="relative">
        <div className="flex items-center justify-center w-full">
          <div className="relative h-72 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${index}-${testimonial.name}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index] || 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index] || 0,
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index] || 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-2xl object-cover object-center shadow-lg border-2 border-emerald-100"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-2">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="h-9 w-9 rounded-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
              hover:from-[#1a4d1a] hover:to-[#0d2d0d] flex items-center justify-center 
              group/button shadow-md transition-all duration-200 hover:scale-110"
          >
            <IconArrowLeft className="h-5 w-5 text-white group-hover/button:rotate-12 transition-transform duration-300" />
          </button>
          <button
            onClick={handleNext}
            className="h-9 w-9 rounded-full bg-gradient-to-r from-[#1a5c1a] to-[#0d3d0d] 
              hover:from-[#1a4d1a] hover:to-[#0d2d0d] flex items-center justify-center 
              group/button shadow-md transition-all duration-200 hover:scale-110"
          >
            <IconArrowRight className="h-5 w-5 text-white group-hover/button:-rotate-12 transition-transform duration-300" />
          </button>
        </div>

        <p className="font-noto font-semibold text-base text-emerald-800 truncate max-w-[60%]">
          {testimonials[active]?.name}
        </p>
      </div>
    </div>
  );
};
