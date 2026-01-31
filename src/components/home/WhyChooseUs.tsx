"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, CheckCircle, Zap, Box, FileText } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const reasons = [
  {
    title: "GPS Tracking",
    description: "24/7 real-time shipment monitoring for complete visibility.",
    icon: MapPin,
  },
  {
    title: "Safety & Guarantee",
    description: "Prioritizing cargo, drivers, and environmental safety.",
    icon: Shield,
  },
  {
    title: "Customer Satisfaction",
    description: "On-time delivery, every time, with professional handling.",
    icon: CheckCircle,
  },
  {
    title: "Swift Transportation",
    description: "Fast, efficient logistics without compromising safety.",
    icon: Zap,
  },
  {
    title: "Complicated Cargo",
    description: "Expertise in oversized and heavy industrial transport.",
    icon: Box,
  },
  {
    title: "RTA Permissions",
    description: "Full compliance, escorts, and professional planning.",
    icon: FileText,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-mysha-blue mb-6">
              Why Choose Mysha Transport
            </h2>
            <p className="text-mysha-blue/60 text-lg">
              We combine years of experience with modern technology to deliver exceptional logistics services.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="p-8 border border-mysha-blue/5 rounded-2xl bg-mysha-silver/30 hover:bg-mysha-blue group transition-all duration-500"
              >
                <div className="w-12 h-12 bg-mysha-blue rounded-lg flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                  <reason.icon className="w-6 h-6 text-white group-hover:text-mysha-blue transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-mysha-blue mb-3 group-hover:text-white transition-colors">
                  {reason.title}
                </h3>
                <p className="text-mysha-blue/60 text-sm group-hover:text-white/70 transition-colors">
                  {reason.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
