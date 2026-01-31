"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MapPin, Globe, Navigation2 } from "lucide-react";

const regions = [
  { name: "Dubai", x: "75%", y: "45%", type: "hub" },
  { name: "Abu Dhabi", x: "65%", y: "52%", type: "uae" },
  { name: "Riyadh", x: "40%", y: "48%", type: "gcc" },
  { name: "Jeddah", x: "20%", y: "60%", type: "gcc" },
  { name: "Kuwait", x: "45%", y: "30%", type: "gcc" },
  { name: "Doha", x: "62%", y: "42%", type: "gcc" },
  { name: "Muscat", x: "85%", y: "60%", type: "gcc" },
  { name: "Manama", x: "58%", y: "38%", type: "gcc" },
];

export function ServiceCoverage() {
  return (
    <section className="py-32 bg-[#050A15] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative z-10">
            <ScrollReveal>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-[1px] bg-white/30" />
                <span className="text-white/50 text-xs font-black uppercase tracking-[0.4em]">Strategic Network</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-10 leading-[0.9] tracking-tighter">
                UNMATCHED <br />
                <span className="text-white/20">REGIONAL</span> <br />
                COVERAGE
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className="space-y-4 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-500">
                      <Navigation2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm">UAE Hubs</h3>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    Integrated logistics across all seven emirates with our primary operations centered in Dubai and Abu Dhabi.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-[11px] font-black uppercase tracking-widest text-white/60">
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Dubai</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Abu Dhabi</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Sharjah</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Ajman</li>
                  </ul>
                </div>

                <div className="space-y-4 group">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-500">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm">GCC Network</h3>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed font-medium">
                    Seamless cross-border transportation serving the entire Gulf Cooperation Council region with real-time tracking.
                  </p>
                  <ul className="grid grid-cols-2 gap-2 text-[11px] font-black uppercase tracking-widest text-white/60">
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Saudi Arabia</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Qatar</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Oman</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Kuwait</li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5">
                <div className="flex items-center space-x-8">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050A15] bg-white/10 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Client" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-pointer" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest">
                    Trusted by 500+ Regional Partners
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
  
          <div className="relative aspect-square bg-[#0A1120] rounded-[40px] border border-white/5 overflow-hidden group shadow-2xl">
            {/* Middle East Map Projection (Abstract SVG) */}
            <div className="absolute inset-0 opacity-20 transition-all duration-[3000ms] group-hover:scale-105 group-hover:opacity-30">
              <svg viewBox="0 0 800 800" className="w-full h-full fill-white/10">
                <path d="M400,100 Q600,150 700,400 T400,700 T100,400 T400,100" /> {/* Abstract Landmass */}
              </svg>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
            
            {/* Connection Lines from Dubai Hub */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {regions.filter(r => r.type !== "hub").map((region, i) => (
                <motion.path
                  key={`line-${i}`}
                  d={`M 600 360 Q ${parseInt(region.x)*8} ${parseInt(region.y)*8} ${parseInt(region.x)*8} ${parseInt(region.y)*8}`}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: i * 0.2, ease: "easeInOut" }}
                />
              ))}
            </svg>
  
            {regions.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5 + (i * 0.1) 
                }}
                className="absolute group/marker cursor-pointer"
                style={{ left: region.x, top: region.y }}
              >
                <div className="relative">
                  {region.type === "hub" ? (
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full animate-ping absolute inset-0 opacity-20" />
                      <div className="w-4 h-4 bg-white rounded-full relative z-10 shadow-[0_0_20px_white]">
                        <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-2 h-2 bg-white/40 rounded-full relative z-10 hover:bg-white transition-colors" />
                  )}
                  
                  <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2 opacity-0 group-hover/marker:opacity-100 transition-all duration-500 translate-x-4 group-hover/marker:translate-x-0 whitespace-nowrap z-20">
                    <div className="bg-white text-primary px-4 py-2 rounded-xl shadow-2xl">
                      <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">{region.type === "hub" ? "Operational Hub" : "Service Node"}</p>
                      <p className="text-sm font-bold">{region.name}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Scanning Effect */}
            <motion.div 
              animate={{
                top: ["0%", "100%", "0%"]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

