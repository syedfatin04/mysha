"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-20 bg-mysha-blue overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 leading-[0.9]">
          <TextReveal text={title} />
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/60 text-xl md:text-2xl max-w-3xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
