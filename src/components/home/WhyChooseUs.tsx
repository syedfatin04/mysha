"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, CheckCircle, Zap, Box, FileText } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

const reasons = [
  {
    title: "GPS Tracking",
    description: "24/7 real-time shipment monitoring for complete visibility.",
    icon: MapPin,
  },
  {
    title: "Safety & Guarantee",
    description: "Prioritizing cargo, drivers, and environmental safety.",
    icon: Shield,
  },
  {
    title: "Customer Satisfaction",
    description: "On-time delivery, every time, with professional handling.",
    icon: CheckCircle,
  },
  {
    title: "Swift Transportation",
    description: "Fast, efficient logistics without compromising safety.",
    icon: Zap,
  },
  {
    title: "Complicated Cargo",
    description: "Expertise in oversized and heavy industrial transport.",
    icon: Box,
  },
  {
    title: "RTA Permissions",
    description: "Full compliance, escorts, and professional planning.",
    icon: FileText,
  },
];

function Truck3DModel() {
  const { scene } = useGLTF("/volvo_fh_16.glb");
  
  return (
    <primitive 
      object={scene} 
      scale={[0.9, 0.9, 0.9]}
      rotation={[0, -458, 0]}
      position={[1, -1, 1]}
    />
  );
}

function Truck3DScene() {
  return (
    <Canvas camera={{ position: [0, 2, -8], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <PerspectiveCamera makeDefault position={[0, 2, -8]} />
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.5} 
      />
      <Suspense fallback={null}>
        <Truck3DModel />
      </Suspense>
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        enableDamping={false}
      />
    </Canvas>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-28 bg-primary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-white/10 blur-[140px]" />
        <div className="absolute -bottom-48 right-0 h-[520px] w-[520px] rounded-full bg-white/5 blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Centered Heading */}
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-black uppercase tracking-[0.22em]">
              Excellence. Safety. Control.
            </div>
            <h2 className="mt-6 text-4xl md:text-6xl font-display font-black text-white tracking-tight">
              Why Choose Mysha Transport
            </h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-3xl mx-auto">
              We combine years of experience with modern technology to deliver exceptional logistics services.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards with 3D Model in Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side Cards */}
          <div className="lg:col-span-4 space-y-6">
            {reasons.slice(0, 3).map((reason, index) => (
              <ScrollReveal key={reason.title} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-[0_25px_90px_rgba(0,0,0,0.35)]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                        <reason.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-black text-white">
                          {reason.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/70 leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Center 3D Model */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full h-[400px] lg:h-[500px]"
            >
              <Truck3DScene />
            </motion.div>
          </div>

          {/* Right Side Cards */}
          <div className="lg:col-span-4 space-y-6">
            {reasons.slice(3, 6).map((reason, index) => (
              <ScrollReveal key={reason.title} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-[0_25px_90px_rgba(0,0,0,0.35)]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  <div className="relative">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                        <reason.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-black text-white">
                          {reason.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/70 leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
