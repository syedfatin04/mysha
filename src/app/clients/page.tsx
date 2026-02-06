"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Building2, Globe, Award, Clock, Zap, Star, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";
import { clientData } from "@/lib/clients";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Clients | MYSHA Transport Dubai UAE",
  description: "Discover 25+ trusted clients served by MYSHA Transport across UAE and GCC. Leading logistics partner for steel, engineering, construction, and manufacturing industries.",
  keywords: "MYSHA Transport clients, Dubai logistics customers, UAE transportation partners, GCC freight clients, industrial transport services",
  openGraph: {
    title: "Our Clients | MYSHA Transport Dubai UAE",
    description: "Discover 25+ trusted clients served by MYSHA Transport across UAE and GCC. Leading logistics partner for industries.",
    url: "https://mysha-transport.vercel.app/clients",
  },
};

const stats = [
  { icon: Building2, value: "25+", label: "Industries", color: "from-blue-500 to-purple-600" },
  { icon: Globe, value: "7", label: "Countries", color: "from-green-500 to-teal-600" },
  { icon: Clock, value: "3+", label: "Years Trust", color: "from-orange-500 to-red-600" },
  { icon: Award, value: "100%", label: "Satisfaction", color: "from-purple-500 to-pink-600" }
];

const categories = [
  "All Clients",
  "Steel Industry", 
  "Engineering",
  "Construction",
  "Manufacturing",
  "Industrial",
  "Others"
];

export default function ClientsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Clients");
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; z: number; size: number; opacity: number; duration: number; delay: number }[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotation3D = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setIsLoaded(true);
    // Generate fewer 3D particles for better performance
    setParticles([...Array(15)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10
    })));

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 60;
      const y = (clientY / window.innerHeight - 0.5) * 60;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Animate 3D particles
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + (Math.random() - 0.5) * 0.5,
        y: particle.y + (Math.random() - 0.5) * 0.5,
        z: particle.z + (Math.random() - 0.5) * 0.5,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const filteredClients = selectedCategory === "All Clients" 
    ? clientData 
    : clientData.filter(client => client.category === selectedCategory);

  return (
    <div className="flex flex-col">
      {/* Insane 3D Animated Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-40 pb-16 bg-mysha-blue overflow-hidden min-h-[50vh] flex items-center"
        style={{ perspective: "1000px" }}
      >
        {/* 3D Particle Field */}
        <div className="absolute inset-0 perspective-1000 overflow-hidden">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotateX: -90 }}
              animate={{ 
                opacity: particle.opacity,
                scale: 1,
                rotateX: 0,
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                z: `${particle.z}px`
              }}
              transition={{ duration: 2, delay: particle.id * 0.05 }}
              style={{
                transform: `translate3d(${particle.x}vw, ${particle.y}vh, ${particle.z}px)`,
                transformStyle: 'preserve-3d'
              }}
              className="absolute"
            >
              <motion.div
                animate={{ 
                  rotateX: 360, 
                  rotateY: 360,
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: particle.duration, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: particle.delay
                }}
                className="rounded-full bg-gradient-to-r from-white/40 to-blue-400/40 blur-sm"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size * 20}px`,
                  boxShadow: `0 0 ${particle.size * 3}px rgba(255,255,255,0.3)`
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* 3D Volumetric Lighting */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 bg-white/10 blur-[150px] rounded-full" />
          <div className="absolute inset-20 bg-blue-400/20 blur-[100px] rounded-full animate-pulse" />
          <div className="absolute inset-40 bg-purple-400/10 blur-[80px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </motion.div>

        {/* 3D Rotating Rings */}
        <motion.div
          style={{ rotateZ: rotation3D, rotateX: 45 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"
        />
        <motion.div
          style={{ rotateZ: -rotation3D, rotateY: 45 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full"
        />

        {/* Mouse-following 3D Cursor Effect */}
        <AnimatePresence>
          {isLoaded && !shouldReduceMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 100,
              }}
              className="fixed pointer-events-none z-30"
            >
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-white/15 via-blue-400/15 to-purple-400/15 blur-2xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/10"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-5xl">
            {/* 3D Animated Main Heading */}
            <motion.div
              style={{ scale, rotateY: rotation3D }}
              className="mb-8"
            >
              <ScrollReveal>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] tracking-tight uppercase">
                  <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.div
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                    >
                      <TextReveal text="Trusted by" />
                    </motion.div>
                    <motion.div
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.6 }}
                      className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    >
                      <TextReveal text="Industry Leaders" />
                    </motion.div>
                  </div>
                </h1>
              </ScrollReveal>
            </motion.div>
            
            <ScrollReveal delay={0.5}>
              <motion.p
                initial={{ opacity: 0, y: 30, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-white/60 text-lg sm:text-xl md:text-2xl max-w-3xl font-light leading-relaxed mb-16 px-4"
              >
                Partnering with the most prestigious companies across the UAE and GCC region for over a decade
              </motion.p>
            </ScrollReveal>

            {/* 3D Stats Grid */}
            <motion.div
              initial={{ opacity: 0, rotateX: -45 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  onHoverStart={() => setHoveredClient(stat.label)}
                  onHoverEnd={() => setHoveredClient(null)}
                  className="relative group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    animate={{
                      scale: hoveredClient === stat.label ? 1.1 : 1,
                      rotateY: hoveredClient === stat.label ? 15 : 0,
                      z: hoveredClient === stat.label ? 50 : 0
                    }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="relative p-4 sm:p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center"
                  >
                    <div className="relative z-10">
                      <motion.div
                        animate={{ 
                          rotateZ: hoveredClient === stat.label ? 360 : 0,
                          scale: hoveredClient === stat.label ? 1.2 : 1
                        }}
                        transition={{ duration: 0.6 }}
                        className="w-12 h-12 sm:w-14 sm:h-16 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center"
                      >
                        <stat.icon className="w-6 h-6 sm:w-7 sm:h-8 lg:w-8 lg:h-8 text-white" />
                      </motion.div>
                      <motion.div
                        animate={{ 
                          scale: hoveredClient === stat.label ? 1.1 : 1,
                          textShadow: hoveredClient === stat.label ? "0 0 20px rgba(255,255,255,0.5)" : "none"
                        }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                    </div>
                    
                    {/* 3D Glow Effect */}
                    {hoveredClient === stat.label && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute -inset-2 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl -z-10`}
                      />
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Cinematic Bottom Shadow */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-mysha-blue to-transparent z-10" />
      </section>

      {/* Category Filter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-4 text-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 text-center ${
                    selectedCategory === category
                      ? "bg-mysha-blue text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                      : "bg-mysha-silver text-mysha-blue hover:bg-mysha-blue hover:text-white"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py--90 bg-gradient-to-b from-white to-mysha-silver/30">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="mb-8 flex flex-col items-center text-center w-full max-w-5xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full text-5xl md:text-7xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-mysha-blue via-blue-600 to-purple-600 mb-6 uppercase tracking-tighter text-center"
              >
                Our Valued Partners
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full text-xl md:text-2xl text-mysha-blue/80 max-w-4xl mx-auto leading-relaxed text-center font-light"
              >
                We are proud to serve industry leaders across multiple sectors with our 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mysha-blue to-purple-600 font-semibold"> premium transportation solutions</span>
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClients.map((client, index) => (
              <ScrollReveal key={client.name} delay={index * 0.05}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  onHoverStart={() => setHoveredClient(client.name)}
                  onHoverEnd={() => setHoveredClient(null)}
                  className="relative group h-[240px] md:h-[260px]"
                >
                  <div className="relative p-6 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-mysha-blue/10 h-full flex flex-col items-center justify-center text-center">
                    {/* Hover Background */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredClient === client.name ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-br from-mysha-blue/10 to-purple-500/10 rounded-2xl"
                    />
                    
                    {/* Client Logo */}
                    <div className="relative z-10 w-24 h-24 mb-4 flex items-center justify-center flex-shrink-0">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={90}
                        height={90}
                        className="object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-110 max-h-full max-w-full"
                      />
                    </div>
                    
                    {/* Client Info */}
                    <div className="relative z-10 flex flex-col items-center justify-center flex-1">
                      <h3 className="text-base font-bold text-mysha-blue mb-1 group-hover:text-black transition-colors text-center leading-tight">
                        {client.name}
                      </h3>
                      <div className="text-xs text-mysha-blue/60 group-hover:text-black/60 transition-colors text-center">
                        {client.category}
                      </div>
                    </div>

                    {/* Animated Border */}
                    <motion.div
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: hoveredClient === client.name ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                    >
                      <svg className="w-full h-full">
                        <rect
                          x="2"
                          y="2"
                          width="calc(100% - 4px)"
                          height="calc(100% - 4px)"
                          rx="16"
                          stroke="url(#gradient)"
                          strokeWidth="2"
                          fill="none"
                          vectorEffect="non-scaling-stroke"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#8B5CF6" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Glow Effect */}
                  {hoveredClient === client.name && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10"
                    />
                  )}
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Modern CTA Section */}
      <section className="relative py-24 overflow-hidden bg-primary">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24%,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.03)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.03)_75%,rgba(255,255,255,0.03)_76%,transparent_77%,transparent)] bg-[length:80px_80px]" />
        </div>

        {/* Subtle Gradient Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl" />

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-5xl mx-auto"
            >
              {/* Professional Heading */}
              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white leading-tight"
              >
                <span className="relative">
                  Ready to Join
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 font-black"
                  >
                    Our Family?
                  </motion.span>
                </span>
              </motion.h2>

              {/* Professional Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed font-light max-w-4xl mx-auto"
              >
                Become part of our growing network of satisfied clients who trust 
                <span className="font-semibold text-white"> MYSHA TRANSPORT</span> for their logistics needs.
              </motion.p>
              
              {/* Professional Button Container */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* Primary Button */}
                <motion.a
                  href="/contact"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-12 py-4 bg-gradient-to-r from-white to-cyan-50 text-mysha-blue font-semibold text-lg rounded-full transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle Background Animation */}
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent"
                  />
                  
                  {/* Button Text */}
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Get Started
                  </span>
                </motion.a>

                {/* Secondary Button */}
                <motion.a
                  href="/services"
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: "rgba(255,255,255,0.8)",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-12 py-4 border-2 border-white/50 text-white font-semibold text-lg rounded-full transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9 9m9-9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Our Services
                  </span>
                </motion.a>
              </motion.div>

              {/* Professional Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Trusted by 100+ Companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>100% Satisfaction</span>
                </div>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
