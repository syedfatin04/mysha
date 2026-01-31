"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <ScrollReveal direction="right">
          <div className="relative aspect-square rounded-3xl overflow-hidden group">
            <div className="absolute inset-0 bg-mysha-blue/10 group-hover:bg-mysha-blue/5 transition-colors" />
            {/* Geometric pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-mysha-blue)_1px,_transparent_1px)] bg-[size:20px_20px]" />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-mysha-blue text-9xl font-display font-black opacity-10 select-none">2014</div>
            </div>
            <div className="absolute bottom-8 left-8 right-8 p-8 glass rounded-2xl border border-mysha-blue/10">
              <p className="text-mysha-blue font-bold text-xl mb-2">9+ Years of Excellence</p>
              <p className="text-mysha-blue/60 text-sm italic">"Delivering trust across borders since day one."</p>
            </div>
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-mysha-blue mb-8">
              Pioneering Logistics in the UAE
            </h2>
            <div className="space-y-6 text-mysha-blue/70 text-lg leading-relaxed mb-10">
              <p>
                Mysha Transport has been providing dependable transportation and logistics solutions since 2014. With a strong fleet, experienced drivers, and cross-border expertise, we ensure every shipment is handled with precision.
              </p>
              <p>
                Operating from Dubai, we have expanded our reach across the entire GCC, building a reputation for safety, professionalism, and technology-driven operations.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center space-x-3 bg-mysha-blue text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
