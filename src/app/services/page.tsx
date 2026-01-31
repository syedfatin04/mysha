"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { 
  Truck, 
  Globe, 
  ShieldCheck, 
  Smile, 
  Zap, 
  Map, 
  Box 
} from "lucide-react";

const services = [
  {
    title: "Local UAE Transport",
    description: "Reliable deliveries across all Emirates with flexible scheduling. We ensure your goods move seamlessly between Dubai, Abu Dhabi, Sharjah, and beyond.",
    icon: Truck,
    details: ["7/24 Operations", "All Emirates Covered", "Flexible Scheduling"]
  },
  {
    title: "Transit & Cross-Border",
    description: "Expert logistics spanning Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman. We handle all documentation and permits for smooth border crossings.",
    icon: Globe,
    details: ["Customs Clearance", "GCC-wide Network", "Cross-border Expertise"]
  },
  {
    title: "Safety & Guarantee",
    description: "Your cargo is our priority. We implement rigorous safety standards, cargo protection protocols, and environmental responsibility.",
    icon: ShieldCheck,
    details: ["Cargo Insurance", "Safety Training", "Eco-friendly Practices"]
  },
  {
    title: "Complicated & Oversized",
    description: "Handling heavy industrial loads up to 80 tons. Includes RTA approvals, escort vehicles, and detailed route surveys.",
    icon: Box,
    details: ["Up to 80 Tons", "RTA Approvals", "Route Surveys"]
  },
  {
    title: "GPS Tracking",
    description: "24/7 real-time visibility for your shipments. Monitor your cargo's journey at every stage for complete peace of mind.",
    icon: Map,
    details: ["Real-time Updates", "Precise Location", "Instant Alerts"]
  },
  {
    title: "Swift Transportation",
    description: "Fast-track logistics solutions for time-sensitive cargo. We optimize routes to ensure the quickest delivery times possible.",
    icon: Zap,
    details: ["Express Delivery", "Route Optimization", "Priority Handling"]
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <PageHero 
        title="Comprehensive Logistics Solutions" 
        subtitle="Moving your business forward with precision and speed across the GCC."
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <ScrollReveal key={service.title} delay={i * 0.1} width="100%">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group p-8 md:p-12 bg-mysha-silver/30 rounded-[40px] border border-mysha-blue/5 hover:bg-mysha-blue transition-all duration-500 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 bg-mysha-blue rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
                      <service.icon className="w-8 h-8 text-white group-hover:text-mysha-blue transition-colors" />
                    </div>
                    <span className="text-4xl font-display font-black text-mysha-blue/5 group-hover:text-white/10 transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-mysha-blue mb-4 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-mysha-blue/60 text-lg mb-8 group-hover:text-white/70 transition-colors leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {service.details.map((detail) => (
                      <div key={detail} className="px-4 py-2 bg-white/50 rounded-full text-xs font-bold uppercase tracking-widest text-mysha-blue group-hover:bg-white/10 group-hover:text-white transition-all text-center">
                        {detail}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-24 bg-mysha-blue text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#fff_1px,transparent_1px)] bg-[size:30px_30px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <Smile className="w-16 h-16 mx-auto mb-8 opacity-50" />
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                "On-time deliveries backed by professional handling and absolute customer satisfaction."
              </h2>
              <p className="text-white/50 text-xl font-bold uppercase tracking-[0.3em]">Our Promise Since 2014</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
