"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Star, Shield, Truck, Globe, Award, Zap, MessageSquare } from "lucide-react";
import { useRef, useEffect, useState } from "react";

import emailjs from "@emailjs/browser";

const stats = [
  { icon: Phone, value: "24/7", label: "Support", color: "from-blue-500 to-purple-600" },
  { icon: Globe, value: "7", label: "Countries", color: "from-green-500 to-teal-600" },
  { icon: Award, value: "100%", label: "Reliability", color: "from-orange-500 to-red-600" },
  { icon: Zap, value: "Fast", label: "Response", color: "from-purple-500 to-pink-600" }
];

export default function ContactPage() {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; z: number; size: number; opacity: number; duration: number; delay: number }[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL || "myshatransport2023@gmail.com",
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        templateParams
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to send email:", error);
      // You can add error handling here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
                      <TextReveal text="Let's Move Your" />
                    </motion.div>
                    <motion.div
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.6 }}
                      className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    >
                      <TextReveal text="Business Forward" />
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
                Get a premium logistics consultation and quote for your next GCC-wide project
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

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info Side */}
            <div>
              <ScrollReveal>
                <h2 className="text-4xl font-display font-bold text-mysha-blue mb-12">Contact Details</h2>
                
                <div className="space-y-12 mb-16">
                  {[
                    { icon: Phone, label: "Phone / WhatsApp", value: "+971 55 779 6387", link: "tel:+971557796387" },
                    { icon: Mail, label: "Email Address", value: "myshatransport2023@gmail.com", link: "mailto:myshatransport2023@gmail.com" },
                    { icon: MapPin, label: "Our Location", value: "Dubai, United Arab Emirates", link: "#" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start space-x-6 group">
                      <div className="w-14 h-14 bg-mysha-silver/30 rounded-2xl flex items-center justify-center group-hover:bg-mysha-blue transition-all duration-500">
                        <item.icon className="w-6 h-6 text-mysha-blue group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-mysha-blue/40 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                        <a href={item.link} className="text-2xl font-bold text-mysha-blue hover:text-mysha-blue/70 transition-colors">
                          {item.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-10 bg-mysha-blue rounded-[40px] text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                      <Clock className="w-6 h-6 text-white/50" />
                      <h3 className="text-xl font-bold uppercase tracking-widest">Business Hours</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-60">Mon – Thu</span>
                        <span className="font-bold">9:00 AM – 6:00 PM</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-60">Friday</span>
                        <span className="font-bold">9:00 AM – 1:00 PM</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span className="opacity-60">Saturday</span>
                        <span className="font-bold">9:00 AM – 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">Sunday</span>
                        <span className="font-bold text-white/40">Closed</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Clock className="w-32 h-32" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Form Side */}
            <div className="relative">
              <ScrollReveal direction="left">
                <div className="p-8 md:p-12 bg-mysha-silver/10 rounded-[40px] border border-mysha-blue/5">
                  <h3 className="text-3xl font-bold text-mysha-blue mb-8">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 px-8 bg-green-50 border-2 border-green-200 rounded-2xl"
                      >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                        <p className="text-green-600">Thank you for contacting us. We'll get back to you shortly.</p>
                      </motion.div>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-mysha-blue/50 ml-1">Full Name</label>
                            <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              required
                              className="w-full px-6 py-4 bg-white border border-mysha-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mysha-blue/20 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-mysha-blue/50 ml-1">Email</label>
                            <input 
                              type="email" 
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="john@example.com"
                              required
                              className="w-full px-6 py-4 bg-white border border-mysha-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mysha-blue/20 transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-mysha-blue/50 ml-1">Subject</label>
                          <select 
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            className="w-full px-6 py-4 bg-white border border-mysha-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mysha-blue/20 transition-all appearance-none"
                          >
                            <option value="">Select a subject</option>
                            <option>General Inquiry</option>
                            <option>Quote Request</option>
                            <option>Partnership</option>
                            <option>Feedback</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-mysha-blue/50 ml-1">Message</label>
                          <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            placeholder="Tell us about your logistics needs..."
                            required
                            className="w-full px-6 py-4 bg-white border border-mysha-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mysha-blue/20 transition-all resize-none"
                          />
                        </div>
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full group relative px-10 py-5 bg-mysha-blue text-white font-bold uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </ScrollReveal>

              {/* WhatsApp Pulse CTA */}
              <ScrollReveal delay={0.4} direction="up">
                <a 
                  href="https://wa.me/971557796387"
                  className="mt-8 flex items-center justify-between p-6 bg-[#25D366] text-white rounded-3xl group overflow-hidden relative"
                >
                  <div className="relative z-10 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">Instant Support</p>
                      <p className="text-xl font-bold">Chat on WhatsApp</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <Send className="w-8 h-8 opacity-20" />
                  </motion.div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
