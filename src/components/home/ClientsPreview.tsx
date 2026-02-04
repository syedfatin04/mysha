"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Image from "next/image";
import { clientData } from "@/lib/clients";

export function ClientsPreview() {
  const duplicatedClients = [...clientData, ...clientData];

  return (
    <section className="py-24 bg-primary overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Working with trusted clients and partners across the Middle East.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex overflow-hidden group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-6 items-center py-10"
          >
            {duplicatedClients.map((client, i) => (
              <motion.div
                key={`${client.name}-${i}`}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl px-6 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-white/20 border border-white/10 overflow-hidden">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    sizes="48px"
                    className="object-contain p-2"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-black text-white whitespace-nowrap">
                    {client.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
