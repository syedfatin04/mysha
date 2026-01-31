"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function VehiclesPreview() {
  return (
    <section className="py-24 bg-mysha-silver/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-mysha-blue mb-6">
                Our Powerful Fleet
              </h2>
              <p className="text-mysha-blue/60 text-lg">
                A powerful and diverse fleet designed to move everything from light cargo to heavy industrial loads across the GCC.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <Link
              href="/fleet"
              className="group flex items-center space-x-3 text-mysha-blue font-bold uppercase tracking-widest hover:translate-x-2 transition-transform"
            >
              <span>View Full Fleet</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Heavy Transport", desc: "Up to 80 Tons capacity", type: "Low Bed" },
            { name: "Box Trailers", desc: "50 Feet / 15 Mtr", type: "Hi-Tech" },
            { name: "Flat Bed Trailers", desc: "40 - 60 Feet", type: "Multiple Variants" },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="aspect-[4/5] relative rounded-3xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-mysha-blue transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-mysha-blue via-mysha-blue/20 to-transparent opacity-60" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">{item.type}</span>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
