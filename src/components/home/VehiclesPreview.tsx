"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function VideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            setIsVisible(true);
            if (videoRef.current) {
              videoRef.current.play();
              setHasPlayed(true);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [hasPlayed]);

  return (
    <div ref={cardRef} className="w-full h-full">
      <video
        ref={videoRef}
        src="/VEHICLES/kling_20260204_VIDEO_Ultra_clea_1902_0.mp4"
        muted
        playsInline
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        style={{ objectPosition: 'center' }}
        onEnded={() => {
          // Video ends and stays at last frame
        }}
      />
    </div>
  );
}

export function VehiclesPreview() {
  return (
    <section className="py-32 bg-mysha-silver/10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-[2px] bg-mysha-blue" />
                <span className="text-mysha-blue font-bold uppercase tracking-[0.4em] text-xs">Our Powerhouse Fleet</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black text-mysha-blue mb-8 leading-tight">
                Engineered for <span className="text-outline-blue text-transparent">Scale</span>
              </h2>
              <p className="text-mysha-blue/60 text-xl font-light leading-relaxed">
                From specialized heavy transport to high-tech box trailers, our diverse fleet is meticulously maintained to ensure peak performance across the GCC.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.2}>
            <Link
              href="/fleet"
              className="group flex items-center gap-4 bg-mysha-blue text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-mysha-blue/90 transition-all shadow-xl active:scale-95"
            >
              <span>View Full Fleet</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              name: "Heavy Transport", 
              desc: "Engineered for oversized industrial loads up to 80 tons.", 
              type: "Low Bed",
              image: "/VEHICLES/pngwing_edited.avif" 
            },
            { 
              name: "Box Trailers", 
              desc: "Premium secure transport for high-value logistics.", 
              type: "Hi-Tech / 50ft",
              image: "/VEHICLES/volvo truck_edited.avif"
            },
            { 
              name: "Flat Bed Units", 
              desc: "Versatile fleet for construction and industrial requirements.", 
              type: "40 - 60 Feet",
              image: "/VEHICLES/flatbed.avif"
            },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -15 }}
                className="group relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mysha-blue via-mysha-blue/40 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                      {item.type}
                    </span>
                    <h3 className="text-3xl font-display font-black text-white mb-4 uppercase">{item.name}</h3>
                    <p className="text-white/60 text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12">
          <ScrollReveal delay={0.15}>
            <motion.div
              whileHover={{ y: -8 }}
              className="group relative h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <VideoCard />
              <div className="absolute inset-0 bg-gradient-to-r from-mysha-blue/95 via-mysha-blue/45 to-transparent" />

              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                <div className="max-w-xl">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">
                    24/7 Operations
                  </div>
                  <div className="mt-3 text-3xl md:text-5xl font-display font-black text-white tracking-tight">
                    Trucking at night
                  </div>
                  <div className="mt-3 text-white/70 text-base md:text-lg leading-relaxed">
                    Night-ready dispatch, tracking, and compliance workflows designed for uninterrupted GCC coverage.
                  </div>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

