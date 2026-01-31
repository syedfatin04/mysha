"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-mysha-blue">
      {/* Background Parallax Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute top-1/4 left-10 w-96 h-64 bg-white/10 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-white/5 blur-3xl rounded-full" />
      </motion.div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-block mb-6 px-4 py-1 border border-white/20 rounded-full glass"
        >
          <span className="text-white/70 text-xs font-bold uppercase tracking-[0.3em]">Premium Logistics since 2014</span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-8 leading-[0.9] max-w-5xl mx-auto">
          <TextReveal text="Reliable Transportation & Logistics Solutions Across the UAE & GCC" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          Delivering safe, efficient, and technology-driven transportation services since 2014.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/contact"
            className="group relative px-10 py-5 bg-white text-mysha-blue font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <motion.div
              className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity"
              whileHover={{ scale: 1.5 }}
            />
            Get a Quote
          </Link>
          <Link
            href="/services"
            className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-colors"
          >
            Explore Our Services
          </Link>
        </motion.div>
      </div>

      {/* Parallax Truck Silhouette Placeholder */}
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[-10%] left-0 w-full h-[30%] opacity-10 pointer-events-none flex justify-around"
      >
        <div className="w-1/3 h-full bg-gradient-to-t from-white to-transparent rounded-t-3xl skew-x-12" />
        <div className="w-1/4 h-full bg-gradient-to-t from-white to-transparent rounded-t-3xl -skew-x-12" />
      </motion.div>
    </section>
  );
}
