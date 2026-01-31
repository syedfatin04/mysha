"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Truck, Box, Layers, Anchor } from "lucide-react";

const fleetCategories = [
  {
    category: "Pick-Up Trucks",
    icon: Truck,
    vehicles: [
      { name: "3 Tons Pick-Up", specs: "Small cargo, quick local delivery" },
      { name: "7 Tons Pick-Up", specs: "Medium cargo, efficient logistics" },
      { name: "10 Tons Pick-Up", specs: "Large local delivery capacity" }
    ]
  },
  {
    category: "Truck Units",
    icon: Box,
    vehicles: [
      { name: "4-Wheel Units", specs: "Agile, urban transport" },
      { name: "6-Wheel Units", specs: "Extended range, higher capacity" }
    ]
  },
  {
    category: "Flat Bed Trailers",
    icon: Layers,
    vehicles: [
      { name: "40 Feet (12 Mtr)", specs: "Standard flatbed transport" },
      { name: "50 Feet (15 Mtr)", specs: "Long cargo capability" },
      { name: "53 Feet (16 Mtr)", specs: "Extended flatbed capacity" },
      { name: "60 Feet (18 Mtr)", specs: "Maximum length flatbed" },
      { name: "Grill Variant", specs: "Secure flatbed with grill" }
    ]
  },
  {
    category: "Specialized Trailers",
    icon: Anchor,
    vehicles: [
      { name: "Box / Hi-Tech 40ft", specs: "Climate & security focused" },
      { name: "Box / Hi-Tech 50ft", specs: "Large volume secured cargo" },
      { name: "Low Bed Trailers", specs: "Heavy & oversized loads" },
      { name: "Heavy Transport", specs: "Up to 80 Tons capacity" }
    ]
  }
];

export default function FleetPage() {
  return (
    <div className="flex flex-col">
      <PageHero 
        title="Our Diverse & Powerful Fleet" 
        subtitle="Modern vehicles equipped with the latest technology to handle any cargo."
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {fleetCategories.map((cat, i) => (
              <div key={cat.category}>
                <ScrollReveal>
                  <div className="flex items-center space-x-4 mb-12">
                    <div className="w-12 h-12 bg-mysha-blue rounded-full flex items-center justify-center">
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-mysha-blue">{cat.category}</h2>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.vehicles.map((vehicle, j) => (
                    <ScrollReveal key={vehicle.name} delay={j * 0.1}>
                      <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 bg-mysha-silver/20 rounded-3xl border border-mysha-blue/5 group hover:bg-mysha-blue transition-all duration-500"
                      >
                        <h3 className="text-xl font-bold text-mysha-blue mb-2 group-hover:text-white transition-colors">{vehicle.name}</h3>
                        <div className="w-12 h-1 bg-mysha-blue/10 mb-6 group-hover:bg-white/20 transition-all" />
                        <p className="text-mysha-blue/60 group-hover:text-white/70 transition-colors">
                          {vehicle.specs}
                        </p>
                        
                        <div className="mt-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Modern Fleet Asset</span>
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          </div>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Image Break */}
      <section className="h-[60vh] relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80')] bg-cover bg-fixed bg-center"
        />
        <div className="absolute inset-0 bg-mysha-blue/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <ScrollReveal>
            <div className="text-center text-white p-6 glass rounded-3xl border border-white/20 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 uppercase tracking-tighter">Ready for Any Load</h2>
              <p className="text-white/80 text-lg">From delicate retail goods to 80-ton industrial machinery, we have the right vehicle for your journey.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
