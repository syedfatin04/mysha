"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-mysha-blue"
    >
      {/* Cinematic Background Elements */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Animated Background Glow */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full" 
        />
        
        {/* Scanline Effect */}
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10"
        />
      </motion.div>

      {/* Grid Overlay with Depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Parallax Floating Particles */}
      <div className="absolute inset-0 z-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-[2px] h-[40px] bg-white/20 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
          >
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em]">
              Premium Corporate Logistics • Since 2014
            </span>
          </motion.div>

          <motion.h1 
            style={{ scale }}
            className="text-6xl md:text-[9vw] lg:text-[7vw] font-display font-black text-white mb-8 leading-[0.85] tracking-tight uppercase"
          >
            <TextReveal 
              text="Reliable Transport Solutions" 
              className="justify-center"
            />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="block mt-2 text-outline-white text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent"
            >
              Across UAE & GCC
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-white/50 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed"
          >
            Delivering safe, efficient, and technology-driven transportation services for elite corporate partners.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <Link
              href="/contact"
              className="group relative px-12 py-6 bg-white text-mysha-blue font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-mysha-blue/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                Get a Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              href="/services"
              className="group flex items-center gap-3 text-white/70 hover:text-white font-bold uppercase tracking-widest transition-all duration-300"
            >
              <span className="border-b-2 border-white/10 group-hover:border-white pb-1">Explore Services</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Abstract Truck Graphic Layer */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-[-5%] left-0 w-full h-[40%] pointer-events-none z-0 overflow-hidden"
      >
        <svg 
          viewBox="0 0 1440 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-5"
        >
          <path 
            d="M0 600H1440V500L1300 450L1100 480L900 430L700 460L400 400L200 440L0 400V600Z" 
            fill="white"
          />
          <motion.path 
            animate={{ x: [-1440, 1440] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            d="M-100 550H0V560H-100V550Z" 
            fill="white"
          />
          <motion.path 
            animate={{ x: [-1440, 1440] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
            d="M-200 520H-50V525H-200V520Z" 
            fill="white"
          />
        </svg>
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      
      {/* Bottom Letterbox Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-mysha-blue to-transparent z-10" />
    </section>
  );
}
