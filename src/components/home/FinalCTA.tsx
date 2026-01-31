"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-32 bg-mysha-blue relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white rounded-full pointer-events-none"
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-12 leading-tight">
            Move your cargo with confidence. <br />
            Partner with Mysha Transport.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="relative px-12 py-6 bg-white text-mysha-blue font-bold uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 group shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10">Get Started Now</span>
              <motion.div
                className="absolute inset-0 bg-mysha-silver opacity-0 group-hover:opacity-20 transition-opacity"
              />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
