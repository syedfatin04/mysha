import Link from "next/link";
import { Truck, Mail, Phone, MapPin, Instagram, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-white p-2 rounded-lg">
                <Truck className="w-6 h-6 text-primary" />
              </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold tracking-tight leading-none">MYSHA</span>
                  <span className="text-[10px] tracking-wider uppercase font-medium opacity-70">Transport</span>
                </div>
              </Link>
              <p className="text-sm opacity-70 leading-relaxed max-w-xs">
                Delivering safe, efficient, and technology-driven transportation services across the UAE & GCC since 2014.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-display text-lg font-bold uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Home</Link></li>
                <li><Link href="/about" className="text-sm opacity-70 hover:opacity-100 transition-opacity">About Us</Link></li>
                <li><Link href="/services" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Services</Link></li>
                <li><Link href="/fleet" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Fleet</Link></li>
                <li><Link href="/contact" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="font-display text-lg font-bold uppercase tracking-wider">Services</h4>
              <ul className="space-y-3">
                <li className="text-sm opacity-70">Local UAE Transport</li>
                <li className="text-sm opacity-70">Cross-Border GCC</li>
                <li className="text-sm opacity-70">Heavy & Oversized</li>
                <li className="text-sm opacity-70">GPS Tracking</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="font-display text-lg font-bold uppercase tracking-wider">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 opacity-70 mt-1" />
                  <span className="text-sm opacity-70">+971 55 779 6387</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 opacity-70 mt-1" />
                  <span className="text-sm opacity-70">info@myshatransport.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 opacity-70 mt-1" />
                  <span className="text-sm opacity-70">Dubai, United Arab Emirates</span>
                </li>
              </ul>
              <div className="flex space-x-4 pt-4">
                <Link href="#" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link href="https://wa.me/971557796387" className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs opacity-50 uppercase tracking-wider">
              © {new Date().getFullYear()} MYSHA TRANSPORT. ALL RIGHTS RESERVED.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-xs opacity-50 hover:opacity-100 uppercase tracking-wider">Privacy Policy</Link>
              <Link href="#" className="text-xs opacity-50 hover:opacity-100 uppercase tracking-wider">Terms & Conditions</Link>
            </div>
          </div>
      </div>
    </footer>
  );
}
