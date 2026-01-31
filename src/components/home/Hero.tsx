"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

import Image from "next/image";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<{ x: string; y: string; opacity: number; duration: number; delay: number }[]>([]);

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
    // Generate particles only on client to avoid hydration mismatch
    setParticles([...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10
    })));

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-mysha-blue"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=2070"
          alt="Logistics background"
          fill
          className="object-cover opacity-40 mix-blend-luminosity scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mysha-blue/80 via-mysha-blue/60 to-mysha-blue" />
      </div>

      {/* Cinematic Background Elements */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 pointer-events-none z-10"
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
          className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </motion.div>

      {/* Grid Overlay with Depth */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] z-10" />

      {/* Parallax Floating Particles */}
      <div className="absolute inset-0 z-10 opacity-30">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: p.x, 
              y: p.y,
              opacity: 0
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, p.opacity, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: p.delay
            }}
            className="absolute w-[1px] h-[60px] bg-white/30 rounded-full"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-8 px-6 py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider">
                The Gold Standard of GCC Logistics
              </span>
            </motion.div>

          <motion.h1 
            style={{ scale }}
            className="text-6xl md:text-[8vw] lg:text-[6.5vw] font-display font-black text-white mb-8 leading-[0.85] tracking-tight uppercase"
          >
            <TextReveal 
              text="Reliable Transport Solutions" 
              className="justify-center"
            />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="block mt-2 text-outline-white text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5"
            >
              Across UAE & GCC
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light leading-relaxed"
          >
            Delivering precision, safety, and efficiency for the most demanding corporate logistics requirements since 2014.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-10"
          >
              <Link
                href="/contact"
                className="group relative px-14 py-6 bg-white text-mysha-blue font-bold uppercase tracking-wider rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                <div className="absolute inset-0 bg-mysha-blue/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Get a Quote <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                href="/services"
                className="group flex items-center gap-4 text-white/80 hover:text-white font-bold uppercase tracking-wider transition-all duration-300"
              >
                <span className="border-b-2 border-white/20 group-hover:border-white pb-1 transition-all">Explore Services</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white transition-all">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </Link>
          </motion.div>
        </div>
      </div>

      {/* Abstract Truck Graphic Layer */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-[-10%] left-0 w-full h-[50%] pointer-events-none z-10 overflow-hidden"
      >
        <svg 
          viewBox="0 0 1440 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-[0.03]"
        >
          <path 
            d="M0 600H1440V500L1300 450L1100 480L900 430L700 460L400 400L200 440L0 400V600Z" 
            fill="white"
          />
        </svg>
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.5)_100%)] z-10" />
      
      {/* Bottom Gradient for Smooth Transition */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-mysha-blue to-transparent z-20" />
    </section>
  );
}

