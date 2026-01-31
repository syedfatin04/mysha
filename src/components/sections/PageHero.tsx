"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/motion/TextReveal";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative pt-60 pb-32 bg-mysha-blue overflow-hidden">
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-mysha-blue/90 via-mysha-blue/70 to-mysha-blue" />
        </div>
      )}

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white mb-10 leading-[0.85] tracking-tight uppercase">
              <TextReveal text={title} />
            </h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/60 text-2xl md:text-3xl max-w-3xl font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Cinematic Bottom Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-mysha-blue to-transparent z-10" />
    </section>
  );
}

