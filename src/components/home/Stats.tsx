"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const stats = [
  { label: "Trusted Corporate Clients", value: 30, suffix: "+" },
  { label: "Trucks & Trailers", value: 105, suffix: "+" },
  { label: "Years of Experience", value: 9, suffix: "+" },
  { label: "Operating GCC Countries", value: 5, suffix: "" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  return (
    <section className="py-24 bg-mysha-blue relative overflow-hidden">
      {/* Subtle Background Motion */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                  <div className="text-5xl md:text-7xl font-display font-bold text-white mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/50 text-xs md:text-sm font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
