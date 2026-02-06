"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { 
  Truck, 
  Globe, 
  ShieldCheck, 
  Smile, 
  Zap, 
  Map, 
  Box,
  Clock,
  Shield
} from "lucide-react";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

interface Particle3D {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

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
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle3D[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
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

  return (
    <div className="flex flex-col">
      {/* Insane 3D Animated Hero Section */}
      <section 
        ref={containerRef}
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
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] tracking-tight uppercase">
                  <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.div
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                    >
                      <TextReveal text="Comprehensive" />
                    </motion.div>
                    <motion.div
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.6 }}
                      className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    >
                      <TextReveal text="Logistics Solutions" />
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
                className="text-white/60 text-xl md:text-2xl max-w-3xl font-light leading-relaxed mb-16"
              >
                End-to-end transportation and logistics services across the UAE and GCC region
              </motion.p>
            </ScrollReveal>

            {/* 3D Stats Grid */}
            <motion.div
              initial={{ opacity: 0, rotateX: -45 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {[
                { icon: Truck, value: "105+", label: "Vehicles", color: "from-blue-500 to-purple-600" },
                { icon: Globe, value: "7", label: "Countries", color: "from-green-500 to-teal-600" },
                { icon: Shield, value: "100%", label: "Safety", color: "from-orange-500 to-red-600" },
                { icon: Clock, value: "24/7", label: "Service", color: "from-purple-500 to-pink-600" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  onHoverStart={() => setHoveredStat(stat.label)}
                  onHoverEnd={() => setHoveredStat(null)}
                  className="relative group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    animate={{
                      scale: hoveredStat === stat.label ? 1.1 : 1,
                      rotateY: hoveredStat === stat.label ? 15 : 0,
                      z: hoveredStat === stat.label ? 50 : 0
                    }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="relative p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-center"
                  >
                    <div className="relative z-10">
                      <motion.div
                        animate={{ 
                          rotateZ: hoveredStat === stat.label ? 360 : 0,
                          scale: hoveredStat === stat.label ? 1.2 : 1
                        }}
                        transition={{ duration: 0.6 }}
                        className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center"
                      >
                        <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                      <motion.div
                        animate={{ 
                          scale: hoveredStat === stat.label ? 1.1 : 1,
                          textShadow: hoveredStat === stat.label ? "0 0 20px rgba(255,255,255,0.5)" : "none"
                        }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-xs sm:text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
                    </div>
                    
                    {/* 3D Glow Effect */}
                    {hoveredStat === stat.label && (
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

      {/* Services Section with Globe */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Enhanced 3D Animated Blue Card Container */}
          <motion.div 
            className="bg-primary rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            {/* 3D Animated Background Elements */}
            <div className="absolute inset-0">
              {/* Floating 3D Orbs */}
              <motion.div
                className="absolute top-10 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl"
                animate={{
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                  rotateZ: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-24 h-24 bg-blue-300/20 rounded-full blur-lg"
                animate={{
                  x: [0, -20, 0],
                  y: [0, 30, 0],
                  scale: [1, 0.8, 1],
                  rotateZ: [0, -180, -360]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <div className="relative z-10">
              <ScrollReveal>
                <motion.div 
                  className="text-center mb-20"
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    transformStyle: "preserve-3d"
                  }}
                >
                  <motion.h2 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-4 sm:mb-6"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 40px rgba(255,255,255,0.8)",
                        "0 0 20px rgba(255,255,255,0.5)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Our Premium Services
                  </motion.h2>
                  <motion.p 
                    className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto px-4"
                    animate={{
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Comprehensive logistics solutions tailored to your business needs across the GCC region
                  </motion.p>
                </motion.div>
              </ScrollReveal>

              {/* 3D Services Grid with Globe in Center */}
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                initial={{ opacity: 0, rotateX: 15 }}
                whileInView={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Left Side Services */}
                <div className="lg:col-span-4 space-y-4 lg:space-y-6">
                  {services.slice(0, 3).map((service, index) => (
                    <ScrollReveal key={service.title} delay={index * 0.1}>
                      <div className="group bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <motion.div 
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-mysha-blue to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                            whileHover={{
                              rotate: [0, 360],
                              scale: 1.1
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <service.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <h3 className="text-lg sm:text-xl font-bold text-mysha-blue">
                                {service.title}
                              </h3>
                              <motion.span 
                                className="text-xs sm:text-sm font-black text-mysha-blue/20"
                                animate={{
                                  rotate: [0, 360]
                                }}
                                transition={{
                                  duration: 10,
                                  repeat: Infinity,
                                  ease: "linear",
                                  delay: index * 0.5
                                }}
                              >
                                0{index + 1}
                              </motion.span>
                            </div>
                            <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {service.details.map((detail, detailIndex) => (
                                <motion.span
                                  key={detail}
                                  className="px-3 py-1 bg-mysha-blue/5 text-xs font-bold text-mysha-blue rounded-full border border-mysha-blue/10"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: detailIndex * 0.1 
                                  }}
                                  whileHover={{
                                    scale: 1.1,
                                    backgroundColor: "rgba(30, 58, 138, 0.1)"
                                  }}
                                >
                                  {detail}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Center Globe */}
                <div className="lg:col-span-4 flex justify-center">
                  <ScrollReveal direction="up">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.3, type: "spring" }}
                      className="w-full max-w-md"
                    >
                      <div className="relative">
                        <div className="text-center mb-8">
                          <h3 className="text-2xl font-bold text-white/90">Across the GCC</h3>
                        </div>
                        <RotatingEarth width={400} height={400} className="mx-auto relative z-10" />
                      </div>
                    </motion.div>
                  </ScrollReveal>
                </div>

                {/* Right Side Services */}
                <div className="lg:col-span-4 space-y-6">
                  {services.slice(3, 6).map((service, index) => (
                    <ScrollReveal key={service.title} delay={(index + 3) * 0.1}>
                      <div className="group bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className="w-14 h-14 bg-gradient-to-br from-mysha-blue to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0"
                            whileHover={{
                              rotate: [0, -360],
                              scale: 1.1
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <service.icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-xl font-bold text-mysha-blue">
                                {service.title}
                              </h3>
                              <motion.span 
                                className="text-sm font-black text-mysha-blue/20"
                                animate={{
                                  rotate: [0, 360]
                                }}
                                transition={{
                                  duration: 10,
                                  repeat: Infinity,
                                  ease: "linear",
                                  delay: (index + 3) * 0.5
                                }}
                              >
                                0{index + 4}
                              </motion.span>
                            </div>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {service.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {service.details.map((detail, detailIndex) => (
                                <motion.span
                                  key={detail}
                                  className="px-3 py-1 bg-mysha-blue/5 text-xs font-bold text-mysha-blue rounded-full border border-mysha-blue/10"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ 
                                    duration: 0.3, 
                                    delay: detailIndex * 0.1 
                                  }}
                                  whileHover={{
                                    scale: 1.1,
                                    backgroundColor: "rgba(30, 58, 138, 0.1)"
                                  }}
                                >
                                  {detail}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-24 bg-mysha-blue text-white">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-display font-black mb-8">
                "On-time deliveries backed by professional handling and absolute customer satisfaction."
              </h2>
              <p className="text-xl text-white/70 mb-12">
                Our Promise Since 2023
              </p>
              <motion.a
                href="/contact"
                className="inline-block px-12 py-6 bg-white text-mysha-blue font-black uppercase tracking-wider rounded-full text-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Today
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
