"use client";

import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({ 
  children, 
  width = "fit-content", 
  delay = 0,
  direction = "up"
}: ScrollRevealProps) {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0
    },
  };

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
