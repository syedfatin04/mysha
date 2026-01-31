"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <PageHero 
        title="Let's Move Your Business Forward" 
        subtitle="Get a premium logistics consultation and quote for your next GCC-wide project."
      />

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
                    { icon: Mail, label: "Email Address", value: "info@myshatransport.com", link: "mailto:info@myshatransport.com" },
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
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-mysha-blue/50 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="John Doe"
                          className="w-full px-6 py-4 bg-white border border-mysha-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mysha-blue/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-mysha-blue/50 ml-1">Email</label>
                        <input 
                          type="email" 
                          placeholder="john@example.com"
                          className="w-full px-6 py-4 bg-white border border-mysha-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mysha-blue/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-mysha-blue/50 ml-1">Subject</label>
                      <select className="w-full px-6 py-4 bg-white border border-mysha-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mysha-blue/20 transition-all appearance-none">
                        <option>General Inquiry</option>
                        <option>Quote Request</option>
                        <option>Partnership</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-mysha-blue/50 ml-1">Message</label>
                      <textarea 
                        rows={5}
                        placeholder="Tell us about your logistics needs..."
                        className="w-full px-6 py-4 bg-white border border-mysha-blue/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-mysha-blue/20 transition-all resize-none"
                      />
                    </div>
                    <button className="w-full group relative px-10 py-5 bg-mysha-blue text-white font-bold uppercase tracking-widest rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-3">
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
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
