"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const clientSectors = [
  { name: "Construction", count: 12 },
  { name: "Industrial", count: 8 },
  { name: "Manufacturing", count: 6 },
  { name: "Logistics", count: 4 },
];

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      <PageHero 
        title="Trusted by the Region's Best" 
        subtitle="Over the past 9 years, Mysha Transport has proudly served more than 30 clients across key industrial sectors."
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-mysha-blue mb-8">Sector Expertise</h2>
              <p className="text-mysha-blue/60 text-lg leading-relaxed">
                Our commitment to reliability and safety has made us the preferred partner for complex logistics in the construction, industrial, and manufacturing sectors across the UAE and GCC.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {clientSectors.map((sector, i) => (
              <ScrollReveal key={sector.name} delay={i * 0.1}>
                <div className="p-10 bg-mysha-silver/30 rounded-[40px] border border-mysha-blue/5 group hover:bg-mysha-blue transition-all duration-500">
                  <div className="text-4xl font-display font-black text-mysha-blue mb-4 group-hover:text-white transition-colors">
                    {sector.count}+
                  </div>
                  <div className="text-mysha-blue/50 text-sm font-bold uppercase tracking-widest group-hover:text-white/50 transition-colors">
                    {sector.name} Clients
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mb-16">
              <h3 className="text-2xl md:text-4xl font-display font-bold text-mysha-blue">Our Client Portfolio</h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 15 }).map((_, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                  className="aspect-video bg-mysha-silver/10 border border-mysha-blue/5 rounded-2xl flex items-center justify-center grayscale opacity-50 hover:opacity-100 transition-all duration-500 cursor-default p-6"
                >
                  <div className="text-mysha-blue font-display font-black text-xl opacity-20 group-hover:opacity-40">LOGISTIC {i + 1}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Style Quote */}
      <section className="py-24 bg-mysha-silver/30 border-y border-mysha-blue/5">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl text-mysha-blue/10 font-serif mb-4">"</div>
              <p className="text-2xl md:text-3xl text-mysha-blue font-bold italic leading-relaxed mb-8">
                Mysha Transport has consistently delivered our heavy machinery across borders with zero delays. Their attention to permit details and route planning is unmatched.
              </p>
              <div className="text-mysha-blue/40 text-sm font-bold uppercase tracking-widest">Lead Project Manager • Major Construction Group</div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
