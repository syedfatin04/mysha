"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { CheckCircle2, Building2, Globe, Award, Clock, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { icon: Building2, value: "2023", label: "Founded", color: "from-blue-500 to-purple-600" },
  { icon: Globe, value: "7", label: "Countries", color: "from-green-500 to-teal-600" },
  { icon: Award, value: "30+", label: "Clients", color: "from-orange-500 to-red-600" },
  { icon: Zap, value: "105+", label: "Vehicles", color: "from-purple-500 to-pink-600" }
];

function VideoCoreValues() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { once: true });
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView && !hasPlayed) {
      video.play().catch(err => console.log("Video play failed:", err));
      setHasPlayed(true);
    }
  }, [isInView, hasPlayed]);

  return (
    <div className="relative w-full h-[80vh] max-h-[800px]">
      {/* Video Background */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
        <video
          ref={videoRef}
          muted
          playsInline
          className="w-full h-full object-cover"
          onEnded={(e) => {
            const video = e.currentTarget;
            video.pause();
            video.currentTime = video.duration;
          }}
        >
          <source src="/VEHICLES/kling_20260204_VIDEO_Ultra_clea_1920_0.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Core Values Overlay */}
      <div className="absolute inset-0 flex items-center justify-between px-12">
        {/* Left Side Values */}
        <div className="space-y-18 w-1/4">
          {[
            "Uncompromising Safety",
            "Operational Excellence", 
            "Customer-Centricity"
          ].map((value, index) => (
            <motion.div
              key={value}
              initial={{ 
                opacity: 0, 
                x: -200,
                scale: 0.5,
                rotateY: -90,
                filter: "blur(10px)"
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                scale: 1,
                rotateY: 0,
                filter: "blur(0px)"
              }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.3,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{
                scale: 1.05,
                x: 10,
                transition: { duration: 0.3 }
              }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-2xl cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{
                    rotate: [0, 360, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "linear"
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0 drop-shadow-lg" />
                </motion.div>
                <motion.span 
                  className="font-bold text-black text-lg drop-shadow-lg flex-1"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0,0,0,0.3)",
                      "0 0 20px rgba(0,0,0,0.5)",
                      "0 0 10px rgba(0,0,0,0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  {value}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side Values */}
        <div className="space-y-18 w-1/4">
          {[
            "Innovation & Tech",
            "Integrity & Trust",
            "Cross-Border Expertise"
          ].map((value, index) => (
            <motion.div
              key={value}
              initial={{ 
                opacity: 0, 
                x: 200,
                scale: 0.5,
                rotateY: 90,
                filter: "blur(10px)"
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                scale: 1,
                rotateY: 0,
                filter: "blur(0px)"
              }}
              transition={{ 
                duration: 1.2, 
                delay: index * 0.3 + 0.4,
                ease: [0.16, 1, 0.3, 1],
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{
                scale: 1.05,
                x: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-2xl cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <motion.span 
                  className="font-bold text-black text-lg drop-shadow-lg flex-1"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(0,0,0,0.3)",
                      "0 0 20px rgba(0,0,0,0.5)",
                      "0 0 10px rgba(0,0,0,0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3 + 0.4,
                    ease: "easeInOut"
                  }}
                >
                  {value}
                </motion.span>
                <motion.div
                  animate={{
                    rotate: [0, -360, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5 + 0.2,
                    ease: "linear"
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0 drop-shadow-lg" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
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
    // Generate 3D particles
    setParticles([...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 15 + 10,
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
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[0.9] tracking-tight uppercase">
                  <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.div
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.2 }}
                    >
                      <TextReveal text="Built on Trust" />
                    </motion.div>
                    <motion.div
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.6 }}
                      className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    >
                      <TextReveal text="Driven by Excellence" />
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
                Establishing excellence in GCC logistics since 2023
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
              {stats.map((stat, index) => (
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
                        className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-white/20 to-white/10 flex items-center justify-center"
                      >
                        <stat.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <motion.div
                        animate={{ 
                          scale: hoveredStat === stat.label ? 1.1 : 1,
                          textShadow: hoveredStat === stat.label ? "0 0 20px rgba(255,255,255,0.5)" : "none"
                        }}
                        className="text-4xl md:text-5xl font-black text-white mb-2"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
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

      {/* SEO Content - Hidden but accessible to search engines */}
      <div className="sr-only">
        <h2>MYSHA Transport Company Profile - Dubai Logistics Leader</h2>
        <p>
          MYSHA Transport LLC is a premier transportation and logistics company headquartered in Dubai, UAE. 
          Since our founding in 2023, we have established ourselves as a trusted partner for businesses 
          seeking reliable freight services across the Gulf Cooperation Council (GCC) region.
        </p>
        <h3>Our Transportation Expertise</h3>
        <p>
          Specializing in cross-border transport, heavy cargo logistics, and comprehensive freight solutions, 
          MYSHA Transport operates a modern fleet of 105+ vehicles. Our transportation services cover 
          Dubai, Abu Dhabi, Sharjah, and extend throughout Saudi Arabia, Oman, Qatar, Kuwait, and Bahrain.
        </p>
        <h3>Logistics Capabilities</h3>
        <p>
          Our logistics expertise includes heavy cargo transport, cross-border freight management, and 
          specialized shipping solutions. With 30+ satisfied clients across 7 countries, we deliver 
          exceptional transportation services tailored to diverse industry needs.
        </p>
        <h3>Commitment to Excellence</h3>
        <p>
          At MYSHA Transport, we combine cutting-edge technology with experienced professionals to 
          provide seamless logistics solutions. Our commitment to safety, reliability, and customer satisfaction 
          makes us the preferred transportation partner in the UAE and across the GCC region.
        </p>
      </div>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <ScrollReveal direction="right">
            <div className="relative max-w-6xl mx-auto">
              {/* Decorative Background Elements */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-mysha-blue/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-mysha-blue/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-mysha-silver/5 rounded-full blur-3xl" />
              
              {/* Header Section */}
              <div className="relative text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-mysha-blue/10 rounded-full border border-mysha-blue/20 mb-8"
                >
                  <div className="w-2 h-2 bg-mysha-blue rounded-full animate-pulse" />
                  <span className="text-mysha-blue font-bold text-sm uppercase tracking-wider">Our Story</span>
                  <div className="w-2 h-2 bg-mysha-blue rounded-full animate-pulse" />
                </motion.div>
                
                <motion.h2 
                  className="text-5xl md:text-7xl font-display font-black text-mysha-blue mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Pioneering Excellence in
                  <span className="block text-mysha-blue/80">GCC Logistics Since 2023</span>
                </motion.h2>
              </div>
              
              {/* Statistics Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary -mx-32 rounded-3xl" />
                <motion.div 
                  className="relative grid md:grid-cols-3 gap-12 mb-20 py-16"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="text-center group">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-20 bg-gradient-to-br from-white to-white/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                    >
                      <span className="text-primary font-bold text-2xl">2023</span>
                    </motion.div>
                    <h3 className="font-bold text-white text-xl mb-3">Founded</h3>
                    <p className="text-white/80 text-lg">Beginning our journey of excellence</p>
                  </div>
                  
                  <div className="text-center group">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-20 bg-gradient-to-br from-white to-white/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                    >
                      <span className="text-primary font-bold text-2xl">105+</span>
                    </motion.div>
                    <h3 className="font-bold text-white text-xl mb-3">Fleet Vehicles</h3>
                    <p className="text-white/80 text-lg">Modern vehicles & equipment</p>
                  </div>
                  
                  <div className="text-center group">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-20 bg-gradient-to-br from-white to-white/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                    >
                      <span className="text-primary font-bold text-2xl">30+</span>
                    </motion.div>
                    <h3 className="font-bold text-white text-xl mb-3">Corporate Clients</h3>
                    <p className="text-white/80 text-lg">Trusted by industry leaders</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Main Content */}
              <div className="space-y-12">
                <motion.p 
                  className="text-2xl text-mysha-blue/90 font-medium leading-relaxed text-center max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Mysha Transport was established with a clear mission: to deliver <span className="font-bold text-mysha-blue">reliable</span>, <span className="font-bold text-mysha-blue">cost-effective</span>, and <span className="font-bold text-mysha-blue">professional</span> transportation solutions across the UAE and GCC.
                </motion.p>
                
                <motion.div 
                  className="grid md:grid-cols-2 gap-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-mysha-blue/5 to-transparent rounded-2xl transform scale-110 group-hover:scale-100 transition-transform duration-300" />
                    <div className="relative p-8 border border-mysha-blue/10 rounded-2xl">
                      <h4 className="font-bold text-mysha-blue text-2xl mb-4 flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-10 h-10 bg-mysha-blue rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <span className="text-white text-lg">✓</span>
                        </motion.div>
                        Complete Control
                      </h4>
                      <p className="text-mysha-blue/70 text-lg leading-relaxed">
                        Operating with our own fleet of modern vehicles and advanced equipment, we handle logistics operations with complete control and accountability.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-l from-mysha-blue/5 to-transparent rounded-2xl transform scale-110 group-hover:scale-100 transition-transform duration-300" />
                    <div className="relative p-8 border border-mysha-blue/10 rounded-2xl">
                      <h4 className="font-bold text-mysha-blue text-2xl mb-4 flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className="w-10 h-10 bg-mysha-blue rounded-full flex items-center justify-center flex-shrink-0"
                        >
                          <span className="text-white text-lg">✓</span>
                        </motion.div>
                        Expert Team
                      </h4>
                      <p className="text-mysha-blue/70 text-lg leading-relaxed">
                        Our highly trained drivers are skilled in documentation, permits, route planning, and complex transport requirements.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-mysha-silver/10 via-transparent to-mysha-silver/10 rounded-3xl" />
                  <div className="relative p-12">
                    <p className="text-xl text-mysha-blue/80 font-medium leading-relaxed max-w-4xl mx-auto">
                      Through dedication, safety standards, and consistent service quality, Mysha Transport has earned the trust of more than <span className="font-bold text-mysha-blue">30 corporate clients</span> across multiple industries including <span className="font-bold text-mysha-blue">construction</span>, <span className="font-bold text-mysha-blue">industrial</span>, and <span className="font-bold text-mysha-blue">manufacturing</span> sectors.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-mysha-blue mb-6">Our Core Values</h2>
            </div>
          </ScrollReveal>

          <VideoCoreValues />
        </div>
      </section>

      

      {/* Corporate Journey Section */}
      <section className="py-32 bg-gradient-to-br from-white via-mysha-silver/5 to-white overflow-hidden relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-mysha-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-mysha-blue/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-mysha-silver/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-mysha-blue/10 rounded-full border border-mysha-blue/20 mb-8"
              >
                <div className="w-2 h-2 bg-mysha-blue rounded-full animate-pulse" />
                <span className="text-mysha-blue font-bold text-sm uppercase tracking-wider">Operations</span>
                <div className="w-2 h-2 bg-mysha-blue rounded-full animate-pulse" />
              </motion.div>
              
              <motion.h2 
                className="text-5xl md:text-7xl font-display font-black text-mysha-blue mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Our Operations
              </motion.h2>
              
              <motion.p 
                className="text-xl text-mysha-blue/70 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Headquartered in Dubai, we manage complex logistics chains that connect the entire GCC region with precision and reliability.
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Strategic Planning", 
                text: "Expert route surveys and logistics documentation with advanced planning systems.",
                icon: "📍",
                color: "from-blue-500 to-blue-600"
              },
              { 
                title: "Own Fleet Control", 
                text: "Complete accountability with our maintained vehicle assets and real-time tracking.",
                icon: "🚛",
                color: "from-blue-600 to-blue-700"
              },
              { 
                title: "GCC Integration", 
                text: "Seamless cross-border transit and customs expertise across all GCC nations.",
                icon: "🌍",
                color: "from-blue-700 to-blue-800"
              }
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.2}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-primary rounded-3xl" />
                  
                  {/* Main Card */}
                  <div className="relative p-12 border border-white/20 rounded-3xl bg-white/10 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-20 h-20 bg-gradient-to-br from-white to-white/80 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg"
                    >
                      <span className="text-3xl">{item.icon}</span>
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-6 text-center group-hover:text-white/80 transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/80 leading-relaxed text-center mb-8">
                      {item.text}
                    </p>
                    
                    {/* Decorative Line */}
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-mysha-blue/10 rounded-full border border-mysha-blue/20">
              <div className="w-3 h-3 bg-mysha-blue rounded-full animate-pulse" />
              <span className="text-mysha-blue font-bold text-sm uppercase tracking-wider">
                Excellence in Every Operation
              </span>
              <div className="w-3 h-3 bg-mysha-blue rounded-full animate-pulse" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
