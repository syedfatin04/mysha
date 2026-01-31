"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const clients = [
  "Construction", "Industrial", "Manufacturing", "Logistics", "Retail", "Energy"
];

export function ClientsPreview() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-mysha-blue mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-mysha-blue/60 max-w-2xl mx-auto">
              Working with trusted clients and partners across the Middle East.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 items-center py-10"
          >
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="text-4xl md:text-6xl font-display font-black text-mysha-blue/5 hover:text-mysha-blue/20 transition-colors cursor-default select-none uppercase tracking-tighter"
              >
                {client}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
