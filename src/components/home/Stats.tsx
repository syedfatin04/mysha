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
    <section className="py-32 bg-[#050A15] relative overflow-hidden">
      {/* Subtle Background Motion */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className={`text-center py-12 ${index !== stats.length - 1 ? "md:border-r border-white/5" : ""}`}>
                  <div className="text-5xl md:text-7xl font-display font-black text-white mb-4 tracking-tighter">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/30 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] max-w-[150px] mx-auto leading-relaxed">
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
