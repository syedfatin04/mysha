"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Image from "next/image";

export function FinalCTA() {
  return (
    <section className="py-40 bg-mysha-blue relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1590486803833-ffc475d5c399?auto=format&fit=crop&q=80&w=2070"
          alt="Trucking at night"
          fill
          className="object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mysha-blue via-mysha-blue/80 to-mysha-blue/40" />
      </div>

      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/20 rounded-full pointer-events-none z-10"
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-16 leading-[1.1] uppercase tracking-tighter">
              Ready to <span className="text-outline-white text-transparent">Scale</span> Your Logistics?
            </h2>
            
            <p className="text-white/60 text-2xl font-light mb-16 max-w-2xl mx-auto leading-relaxed">
              Partner with the GCC's most reliable transport network and experience the power of precision-driven logistics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
              <Link
                href="/contact"
                className="group relative px-16 py-8 bg-white text-mysha-blue font-bold uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_30px_60px_rgba(0,0,0,0.3)]"
              >
                <span className="relative z-10 text-lg">Get a Custom Quote</span>
                <div className="absolute inset-0 bg-mysha-blue translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="absolute inset-0 z-20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-lg">
                  Let's Talk
                </span>
              </Link>
              
              <Link
                href="/contact"
                className="group flex items-center gap-4 text-white/80 hover:text-white font-bold uppercase tracking-widest transition-all"
              >
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-mysha-blue transition-all">
                  <ArrowRight className="w-8 h-8 group-hover:rotate-[-45deg] transition-transform" />
                </div>
                <span className="text-lg">Contact Specialist</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.6)_100%)] z-10" />
    </section>
  );
}

