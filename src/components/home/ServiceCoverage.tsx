"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const regions = [
  { name: "Dubai", x: "50%", y: "40%", type: "uae" },
  { name: "Abu Dhabi", x: "45%", y: "45%", type: "uae" },
  { name: "Sharjah", x: "52%", y: "38%", type: "uae" },
  { name: "Ajman", x: "53%", y: "37%", type: "uae" },
  { name: "Saudi Arabia", x: "30%", y: "50%", type: "gcc" },
  { name: "Kuwait", x: "35%", y: "30%", type: "gcc" },
  { name: "Qatar", x: "42%", y: "42%", type: "gcc" },
  { name: "Bahrain", x: "41%", y: "40%", type: "gcc" },
  { name: "Oman", x: "60%", y: "55%", type: "gcc" },
];

export function ServiceCoverage() {
  return (
    <section className="py-24 bg-mysha-blue relative overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <ScrollReveal>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
              Regional Coverage
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-4">UAE Coverage</h3>
                <p className="text-white text-lg leading-relaxed">
                  Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Al Ain, Umm Al Quwain, Ras Al Khaimah
                </p>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div>
                <h3 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-4">GCC Coverage</h3>
                <p className="text-white text-lg leading-relaxed">
                  Saudi Arabia, Kuwait, Qatar, Bahrain, Sultanate of Oman
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white/5 rounded-3xl border border-white/10 overflow-hidden group">
          {/* Stylized Map Placeholder */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale transition-transform duration-[2000ms] group-hover:scale-110" />
          
          {/* Animated Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.path
              d="M 100 200 Q 200 100 300 200 T 500 200"
              stroke="white"
              strokeWidth="1"
              fill="none"
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>

          {regions.map((region, i) => (
            <motion.div
              key={region.name}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="absolute group/marker"
              style={{ left: region.x, top: region.y }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-white rounded-full animate-ping absolute inset-0" />
                <div className="w-3 h-3 bg-white rounded-full relative z-10" />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover/marker:opacity-100 transition-opacity whitespace-nowrap bg-white text-mysha-blue px-2 py-1 text-[10px] font-bold rounded">
                  {region.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
