"use client";

import Link from "next/link";
import { Truck, Mail, Phone, MapPin, Instagram, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-32 pb-12 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <motion.div 
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Logo & About */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-white p-2.5 rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg]">
                <Truck className="w-7 h-7 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-3xl font-black tracking-tighter leading-none text-white">
                  MYSHA
                </span>
                <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-white/40">
                  Transport
                </span>
              </div>
            </Link>
            <p className="text-base text-white/50 leading-relaxed max-w-xs">
              Pioneering the future of logistics in the UAE and GCC through innovation, safety, and unwavering commitment to excellence.
            </p>
            <div className="flex space-x-5 pt-2">
              {[
                { icon: Instagram, href: "#" },
                { icon: MessageSquare, href: "https://wa.me/971557796387" }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <Link 
                    href={social.href}
                    className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-2xl hover:bg-white hover:text-primary transition-all duration-500"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="font-display text-lg font-black uppercase tracking-widest text-white">Navigation</h4>
            <ul className="space-y-4">
              {["Home", "About", "Services", "Fleet", "Contact"].map((link) => (
                <li key={link}>
                  <Link 
                    href={link === "Home" ? "/" : `/${link.toLowerCase()}`} 
                    className="text-white/50 hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-white mr-0 group-hover:mr-3 transition-all duration-300" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="font-display text-lg font-black uppercase tracking-widest text-white">Expertise</h4>
            <ul className="space-y-4">
              {[
                "Local UAE Logistics",
                "Cross-Border GCC",
                "Heavy Load Solutions",
                "Real-time Tracking"
              ].map((service) => (
                <li key={service} className="text-white/50 flex items-center group cursor-default">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 mr-3 group-hover:bg-white transition-colors" />
                  {service}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="font-display text-lg font-black uppercase tracking-widest text-white">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/30 mb-1">Call Us</span>
                  <span className="text-white/80 font-bold">+971 55 779 6387</span>
                </div>
              </li>
              <li className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-white/30 mb-1">Email Us</span>
                  <span className="text-white/80 font-bold">info@myshatransport.com</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} MYSHA TRANSPORT. CRAFTED FOR EXCELLENCE.
          </p>
          <div className="flex space-x-12">
            {["Privacy Policy", "Terms & Conditions"].map((item) => (
              <Link key={item} href="#" className="text-[10px] text-white/30 hover:text-white font-bold uppercase tracking-[0.2em] transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

