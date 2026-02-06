"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import Link from "next/link";
import { ChevronRight, ArrowRight, Globe, Shield, Truck, Clock, Package, Navigation, Zap } from "lucide-react";

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            if (videoRef.current) {
              videoRef.current.play();
              setHasPlayed(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [hasPlayed]);

  return (
    <video
      ref={videoRef}
      src="/VEHICLES/video-c2ee8556-2d5c-4f0a-8193-1336b6800991.mp4"
      autoPlay
      muted
      playsInline
      className="w-full h-full object-cover opacity-80 mix-blend-normal scale-105"
      style={{ objectPosition: 'center' }}
      onEnded={() => {
        // Video ends and stays at last frame
      }}
    />
  );
}

interface Particle3D {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  color: string;
  type: 'cube' | 'sphere' | 'truck';
}

interface FloatingElement {
  id: number;
  icon: React.ReactNode;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  delay: number;
}

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

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<Particle3D[]>([]);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeStat, setActiveStat] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const rotation3D = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    setIsLoaded(true);
    
    // Generate 3D particles with logistics theme
    const newParticles: Particle3D[] = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      z: Math.random() * 100 - 50,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(59, 130, 246, 0.4)',
      type: ['cube', 'sphere', 'truck'][Math.floor(Math.random() * 3)] as 'cube' | 'sphere' | 'truck'
    }));
    setParticles(newParticles);

    // Generate floating logistics elements
    const elements: FloatingElement[] = [
      { id: 1, icon: <Truck className="w-8 h-8" />, x: 10, y: 20, rotation: -15, scale: 1.2, delay: 0 },
      { id: 2, icon: <Package className="w-6 h-6" />, x: 85, y: 15, rotation: 20, scale: 0.8, delay: 0.5 },
      { id: 3, icon: <Navigation className="w-7 h-7" />, x: 15, y: 80, rotation: 10, scale: 1, delay: 1 },
      { id: 4, icon: <Globe className="w-9 h-9" />, x: 80, y: 75, rotation: -10, scale: 1.1, delay: 1.5 },
      { id: 5, icon: <Zap className="w-6 h-6" />, x: 50, y: 10, rotation: 25, scale: 0.9, delay: 2 },
    ];
    setFloatingElements(elements);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 100;
      const y = (clientY / window.innerHeight - 0.5) * 100;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: clientX, y: clientY });
    };

    const updateScrollProgress = () => {
      setScrollProgress(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", updateScrollProgress);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, [mouseX, mouseY]);

  // Animate 3D particles
  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        z: particle.z + particle.vz,
        // Bounce off boundaries
        vx: Math.abs(particle.x) > 50 ? -particle.vx : particle.vx,
        vy: Math.abs(particle.y) > 50 ? -particle.vy : particle.vy,
        vz: Math.abs(particle.z) > 50 ? -particle.vz : particle.vz,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const animatedBackground = useMemo(() => (
    <div className="absolute inset-0 z-0">
      {/* Multi-layer 3D background */}
      <div className="absolute inset-0">
        <HeroVideo />
      </div>
      
      {/* 3D Grid System */}
      <div className="absolute inset-0 perspective-1000">
        <motion.div
          style={{
            transform: `rotateX(${rotation3D.get()}deg) translateZ(-100px)`,
            transformStyle: 'preserve-3d'
          }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#ffffff03_25%,transparent_25%,transparent_50%,#ffffff03_50%,#ffffff03_75%,transparent_75%,transparent)] bg-[size:60px_60px]" />
        </motion.div>
      </div>

      {/* 3D Particle Field */}
      <div className="absolute inset-0 perspective-1000 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: particle.opacity,
              scale: 1,
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
            {particle.type === 'cube' && (
              <motion.div
                animate={{ rotateX: 360, rotateY: 360 }}
                transition={{ duration: 20 + particle.id, repeat: Infinity, ease: "linear" }}
                className="w-2 h-2 bg-white/60"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                }}
              />
            )}
            {particle.type === 'sphere' && (
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 3 + particle.id * 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`
                }}
              />
            )}
            {particle.type === 'truck' && (
              <motion.div
                animate={{ rotateZ: [0, 10, -10, 0] }}
                transition={{ duration: 4 + particle.id * 0.3, repeat: Infinity, ease: "easeInOut" }}
                className="text-white/40"
                style={{ fontSize: `${particle.size * 3}px` }}
              >
                🚛
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Floating Logistics Elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            initial={{ opacity: 0, scale: 0, rotate: element.rotation }}
            animate={{ 
              opacity: 0.3,
              scale: element.scale,
              rotate: element.rotation + 360,
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 8 + element.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.delay
            }}
            className="absolute text-white/20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Advanced Gradient Overlays - REMOVED */}
      
      {/* 3D Volumetric Lighting */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]"
      >
        <div className="absolute inset-0 bg-white/10 blur-[200px] rounded-full" />
        <div className="absolute inset-20 bg-blue-400/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute inset-40 bg-purple-400/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </motion.div>
    </div>
  ), [particles, floatingElements, springX, springY, rotation3D, shouldReduceMotion]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-start justify-center overflow-hidden pt-40 md:pt-32"
    >
      {animatedBackground}

      {/* SEO Content - Hidden but accessible to search engines */}
      <div className="sr-only">
        <h2>MYSHA Transport - Leading Transportation Company in Dubai, UAE</h2>
        <p>
          MYSHA Transport LLC is a premier transportation and logistics company based in Dubai, UAE, 
          providing reliable freight services across the GCC region since 2023. Our fleet of 105+ trucks 
          delivers exceptional cargo transport solutions throughout Dubai, Abu Dhabi, Sharjah, and all GCC countries.
        </p>
        <h3>Professional Transportation Services</h3>
        <p>
          Specializing in cross-border transport, heavy cargo logistics, and comprehensive freight solutions, 
          MYSHA Transport ensures safe and timely delivery of goods across United Arab Emirates, Saudi Arabia, 
          Oman, Qatar, Kuwait, and Bahrain. Our experienced team handles all types of cargo with modern equipment.
        </p>
        <h3>Why Choose MYSHA Transport?</h3>
        <p>
          As a trusted logistics partner in Dubai, we offer competitive transportation rates, 
          24/7 customer support, and proven track record in GCC freight services. 
          Our modern fleet and experienced drivers make us the preferred choice for businesses 
          seeking reliable transport solutions in the UAE and across the Gulf region.
        </p>
      </div>

      {/* Enhanced 3D Background Elements */}
      <motion.div 
        style={{ y: y1, opacity, rotateX: rotation3D }}
        className="absolute inset-0 pointer-events-none z-10"
      >
        {/* Multiple Scanline Layers */}
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute inset-0 w-full h-[0.3px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
        />
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 10 }}
          className="absolute inset-0 w-full h-[0.2px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
        />
        
        {/* 3D Rotating Rings */}
        <motion.div
          style={{ rotateZ: rotation3D, rotateX: 45 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"
        />
        <motion.div
          style={{ rotateZ: -rotation3D, rotateY: 45 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
        <div className="max-w-3xl">
          {/* 3D Main Heading */}
          <motion.h1 
            style={{ scale, rotateY: rotation3D }}
            className="text-7xl md:text-8xl lg:text-9xl font-display font-black text-white mb-10 leading-[0.85] tracking-tighter uppercase text-left"
          >
            <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                <TextReveal 
                  text="Reliable Transport" 
                  className="justify-start mb-6"
                />
              </motion.div>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                className="h-0.5 w-24 bg-gradient-to-r from-transparent via-white to-white mb-8 rounded-full"
              />
              <motion.div
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
              >
                <TextReveal 
                  text="Solutions" 
                  className="justify-start"
                />
              </motion.div>
            </div>
            <motion.span
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              className="block mt-8 text-4xl md:text-5xl lg:text-6xl font-bold text-outline-white text-transparent bg-clip-text bg-gradient-to-b from-white/50 to-white/10 tracking-normal"
            >
              Across UAE & GCC
            </motion.span>
          </motion.h1>

          {/* 3D CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: -45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="flex flex-col sm:flex-row items-start gap-4 mt-12"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Link
              href="/contact"
              className="relative px-10 py-4 bg-white text-mysha-blue font-black uppercase tracking-[0.15em] rounded-full overflow-hidden transition-all duration-700 shadow-[0_20px_60px_rgba(255,255,255,0.25)]"
            >
              <span className="relative z-10 flex items-center gap-2 text-base">
                Get a Quote 
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            
            <Link
              href="/services"
              className="relative px-10 py-4 bg-transparent text-white font-black uppercase tracking-[0.15em] rounded-full border-2 border-white overflow-hidden transition-all duration-700 hover:bg-white hover:text-mysha-blue"
            >
              <span className="relative z-10 flex items-center gap-2 text-base">
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 3D Abstract Background Waves */}
      <motion.div
        style={{ y: y2, opacity, rotateX: rotation3D }}
        className="absolute bottom-0 left-0 w-full h-[70%] pointer-events-none z-10 overflow-hidden"
      >
        <svg 
          viewBox="0 0 1440 1000" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <motion.path
            d="M0,500 C360,400 720,600 1440,500 L1440,1000 L0,1000 Z"
            fill="url(#gradient1)"
            style={{ opacity: 0.1 }}
            animate={{ d: [
              "M0,500 C360,400 720,600 1440,500 L1440,1000 L0,1000 Z",
              "M0,600 C360,500 720,700 1440,600 L1440,1000 L0,1000 Z",
              "M0,500 C360,400 720,600 1440,500 L1440,1000 L0,1000 Z"
            ] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,600 C480,500 960,700 1440,600 L1440,1000 L0,1000 Z"
            fill="url(#gradient2)"
            style={{ opacity: 0.05 }}
            animate={{ d: [
              "M0,600 C480,500 960,700 1440,600 L1440,1000 L0,1000 Z",
              "M0,700 C480,600 960,800 1440,700 L1440,1000 L0,1000 Z",
              "M0,600 C480,500 960,700 1440,600 L1440,1000 L0,1000 Z"
            ] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
            <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Enhanced 3D Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.8)_100%)] z-10" />
      
      {/* Enhanced Bottom Gradient - REMOVED */}
    </section>
  );
}
