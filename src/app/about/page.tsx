"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/sections/PageHero";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Stats } from "@/components/home/Stats";
import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
        <PageHero 
          title="Built on trust. Driven by reliability. Powered by experience." 
          subtitle="Establishing excellence in GCC logistics since 2014."
          backgroundImage="https://images.unsplash.com/photo-1570675866104-1296c0ca322e?auto=format&fit=crop&q=80&w=2070"
        />


      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal direction="right">
              <div className="space-y-8 text-mysha-blue/70 text-lg leading-relaxed">
                <p className="text-2xl text-mysha-blue font-bold">
                  Mysha Transport was established in 2014 with a clear mission: to deliver reliable, cost-effective, and professional transportation solutions across the UAE and GCC.
                </p>
                <p>
                  Operating with our own fleet of modern vehicles and advanced equipment, we handle logistics operations with complete control and accountability. Our highly trained drivers are skilled in documentation, permits, route planning, and complex transport requirements.
                </p>
                <p>
                  Through dedication, safety standards, and consistent service quality, Mysha Transport has earned the trust of more than 30 corporate clients across multiple industries including construction, industrial, and manufacturing sectors.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-12">
              <ScrollReveal delay={0.2}>
                <div className="p-8 bg-mysha-silver/30 rounded-3xl border border-mysha-blue/5">
                  <h3 className="text-2xl font-bold text-mysha-blue mb-6">Our Core Values</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      "Uncompromising Safety",
                      "Operational Excellence",
                      "Customer-Centricity",
                      "Innovation & Tech",
                      "Integrity & Trust",
                      "Cross-Border Expertise"
                    ].map((value) => (
                      <div key={value} className="flex items-center space-x-3 group">
                        <CheckCircle2 className="w-5 h-5 text-mysha-blue group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-mysha-blue/80">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="aspect-video relative rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-mysha-blue/10 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats with Alternate Style */}
      <section className="py-24 bg-mysha-silver/20 border-y border-mysha-blue/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Fleet Vehicles", value: "105+" },
              { label: "Corporate Clients", value: "30+" },
              { label: "Years Experience", value: "9+" },
              { label: "Countries Served", value: "5" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="text-6xl font-display font-black text-mysha-blue mb-4 group-hover:scale-110 transition-transform duration-500">
                    {stat.value}
                  </div>
                  <div className="h-1 w-12 bg-mysha-blue/20 mb-4 group-hover:w-20 transition-all duration-500" />
                  <div className="text-mysha-blue/50 text-sm font-bold uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Journey Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-mysha-blue mb-6">Our Operations</h2>
              <p className="text-mysha-blue/60 max-w-2xl mx-auto">
                Headquartered in Dubai, we manage complex logistics chains that connect the entire GCC region.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Strategic Planning", text: "Expert route surveys and logistics documentation." },
              { title: "Own Fleet Control", text: "Complete accountability with our maintained vehicle assets." },
              { title: "GCC Integration", text: "Seamless cross-border transit and customs expertise." }
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.2}>
                <div className="p-10 border border-mysha-blue/10 rounded-[40px] hover:border-mysha-blue transition-colors group">
                  <h3 className="text-2xl font-bold text-mysha-blue mb-4 group-hover:text-mysha-blue transition-colors">{item.title}</h3>
                  <p className="text-mysha-blue/60 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
