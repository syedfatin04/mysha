"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Truck } from "lucide-react";

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
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            className="bg-primary p-2 rounded-lg"
          >
            <Truck className="w-6 h-6 text-primary-foreground" />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold tracking-tighter leading-none">MYSHA</span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium opacity-70">Transport</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium tracking-wide uppercase group overflow-hidden"
            >
              <span className={`block transition-transform duration-300 ${pathname === link.href ? "-translate-y-full" : "group-hover:-translate-y-full"}`}>
                {link.name}
              </span>
              <span className={`absolute top-full left-0 block transition-transform duration-300 text-primary ${pathname === link.href ? "-translate-y-full" : "group-hover:-translate-y-full"}`}>
                {link.name}
              </span>
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-border md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold uppercase tracking-widest ${
                    pathname === link.href ? "text-primary" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
