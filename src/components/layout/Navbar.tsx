"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Truck } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Fleet", href: "/fleet" },
  { name: "Clients", href: "/clients" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-primary/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Magnetic>
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white p-2 rounded-xl shadow-lg"
            >
              <Truck className="w-6 h-6 text-primary" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black tracking-tighter leading-none text-white">
                MYSHA
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/70">
                Transport
              </span>
            </div>
          </Link>
        </Magnetic>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-xs font-bold tracking-[0.1em] uppercase group overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <span className={`block transition-transform duration-500 ease-out text-white/90 ${pathname === link.href ? "-translate-y-full" : "group-hover:-translate-y-full"}`}>
                  {link.name}
                </span>
                <span className={`absolute top-full left-0 block transition-transform duration-500 ease-out text-white ${pathname === link.href ? "-translate-y-full" : "group-hover:-translate-y-full"}`}>
                  {link.name}
                </span>
              </div>
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-white rounded-full"
                />
              )}
            </Link>
          ))}
            <Magnetic>
              <Link
                href="/contact"
                className="relative group overflow-hidden bg-white text-primary px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Get a Quote</span>
                <motion.div 
                  className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                />
              </Link>
            </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-primary border-t border-white/10 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-black uppercase tracking-tighter ${
                      pathname === link.href ? "text-white" : "text-white/50"
                    } hover:text-white transition-colors`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-white text-primary py-4 rounded-xl font-black uppercase tracking-widest"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
