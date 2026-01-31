"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Magnetic } from "@/components/motion/Magnetic";

export function AboutPreview() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <ScrollReveal direction="right" className="relative group/parallax">
            <motion.div 
              style={{ y: 0 }}
              whileInView={{ y: [20, -20] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070"
                alt="Mysha Transport Operations"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mysha-blue/80 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-10 left-10 right-10 p-10 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl">
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-white">
                    <p className="text-5xl font-black font-display">2014</p>
                    <p className="text-xs uppercase tracking-wider font-bold opacity-60">Established</p>
                  </div>
                  <div className="w-[1px] h-12 bg-white/20" />
                  <div className="text-white">
                    <p className="text-5xl font-black font-display">9+</p>
                    <p className="text-xs uppercase tracking-wider font-bold opacity-60">Years Exp</p>
                  </div>
                </div>
                <p className="text-white/90 text-lg font-medium leading-relaxed">
                  "Building the future of GCC logistics through unwavering reliability and safety."
                </p>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-mysha-blue/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-mysha-blue/10 rounded-full blur-3xl -z-10" />
          </ScrollReveal>

          <div className="relative">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-[2px] bg-mysha-blue" />
                <span className="text-mysha-blue font-bold uppercase tracking-widest text-xs">About Our Company</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-display font-black text-mysha-blue mb-10 leading-[1.1]">
                Pioneering <span className="text-outline-blue text-transparent">Logistics</span> Excellence
              </h2>
              
              <div className="space-y-8 text-mysha-blue/70 text-xl leading-relaxed mb-12">
                <p className="font-medium text-mysha-blue/90">
                  Mysha Transport has been a cornerstone of dependable transportation and logistics solutions across the UAE and GCC since 2014.
                </p>
                <p>
                  With a powerhouse fleet of over 105 vehicles and a team of veteran drivers, we handle every shipment with surgical precision. Our cross-border expertise ensures that your cargo moves seamlessly across Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman.
                </p>
                <p>
                  We don't just move goods; we move businesses forward by integrating cutting-edge GPS tracking with rigorous safety standards and localized route intelligence.
                </p>
              </div>
              
              <Magnetic>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-4 bg-mysha-blue text-white px-10 py-5 rounded-full font-bold uppercase tracking-wider hover:bg-mysha-blue/90 transition-all shadow-xl hover:shadow-mysha-blue/20 active:scale-95"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
