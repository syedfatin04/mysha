"use client";

import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Magnetic } from "@/components/motion/Magnetic";
import { useRef, useEffect, useState } from "react";

const stats = [
  { label: "Trusted Corporate Clients", value: 30, suffix: "+" },
  { label: "Trucks & Trailers", value: 105, suffix: "+" },
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "Operating GCC Countries", value: 5, suffix: "" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { once: false });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(err => console.log("Video play failed:", err));
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      src="/VEHICLES/kling_20260204_VIDEO_Ultra_clea_1876_0.mp4"
      muted
      playsInline
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-black"
      onEnded={(e) => {
        const video = e.currentTarget;
        video.pause();
        video.currentTime = video.duration;
      }}
    />
  );
}

export function AboutPreview() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative group/parallax">
            <ScrollReveal direction="right">
              <motion.div 
                style={{ y: 0 }}
                whileInView={{ y: [15, -15] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <VideoPlayer />
                <div className="absolute inset-0 bg-gradient-to-t from-mysha-blue/80 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-white">
                      <span className="text-white font-bold text-2xl">2023</span>
                      <p className="text-[9px] uppercase tracking-wider font-bold opacity-60">Established</p>
                    </div>
                    <div className="w-[1px] h-8 bg-white/20" />
                    <div className="text-white">
                      <p className="text-3xl font-black font-display">3+</p>
                      <p className="text-[9px] uppercase tracking-wider font-bold opacity-60">Years Exp</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm font-medium leading-relaxed">
                    "Building the future of GCC logistics through unwavering reliability and safety since 2023."
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-mysha-blue/5 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-mysha-blue/10 rounded-full blur-3xl -z-10" />
          </div>

          <div className="relative">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-[2px] bg-mysha-blue" />
                <span className="block text-mysha-blue/80">GCC Logistics Since 2023</span>
                <span className="text-mysha-blue font-bold uppercase tracking-widest text-xs">About Our Company</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-display font-black text-mysha-blue mb-10 leading-[1.1]">
                Pioneering <span className="text-outline-blue text-transparent">Logistics</span> Excellence Since 2023
              </h2>
              
              <div className="space-y-8 text-mysha-blue/70 text-xl leading-relaxed mb-12">
                <p className="font-medium text-mysha-blue/90">
                  Mysha Transport has been a cornerstone of dependable transportation and logistics solutions across the UAE and GCC since 2023.
                </p>
                <p>
                  With a powerhouse fleet of over 105 vehicles and a team of veteran drivers, we handle every shipment with surgical precision. Our cross-border expertise ensures that your cargo moves seamlessly across Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman.
                </p>
                <p>
                  We don't just move goods; we move businesses forward by integrating cutting-edge GPS tracking with rigorous safety standards and localized route intelligence.
                </p>
              </div>

              {/* Stats Section */}
              <div className="mt-16 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
                  {stats.map((stat, index) => (
                    <div key={stat.label} className={`text-center py-8 ${index !== stats.length - 1 ? "md:border-r border-mysha-blue/10" : ""}`}>
                      <div className="text-4xl md:text-5xl font-display font-black text-mysha-blue mb-3 tracking-tighter">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-mysha-blue/40 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] max-w-[140px] mx-auto leading-relaxed">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Magnetic>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-4 bg-mysha-blue text-white px-10 py-5 rounded-full font-bold uppercase tracking-wider hover:bg-mysha-blue/90 transition-all shadow-xl hover:shadow-mysha-blue/20 active:scale-95"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
