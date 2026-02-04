"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Globe, Navigation2 } from "lucide-react";
import GlobeUI from "@/components/ui/globe";
import Image from "next/image";
import { clientData } from "@/lib/clients";

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
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Umm Al Quwain</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Fujairah</li>
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Ras Al Khaimah</li>
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
                    <li className="flex items-center"><span className="w-1 h-1 bg-white/30 rounded-full mr-2" /> Bahrain</li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5">
                <div className="flex items-center space-x-8">
                  <div className="flex -space-x-3">
                    {clientData.slice(0, 4).map((client) => (
                      <div
                        key={client.name}
                        className="relative w-10 h-10 rounded-full border-2 border-[#050A15] bg-white/10 overflow-hidden"
                      >
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          sizes="40px"
                          className="object-contain p-2 grayscale hover:grayscale-0 transition-all cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest">
                    Trusted by 30+ Regional Partners
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
  
          <div className="relative aspect-square bg-[#0A1120] rounded-[40px] border border-white/5 overflow-hidden group shadow-2xl flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06)_0%,transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <GlobeUI />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

