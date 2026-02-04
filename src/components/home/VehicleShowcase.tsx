"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const vehicleImages = [
  "/all ve/813448_1b5c8d89df3b4fc290e15b56b84f230f~mv2.avif",
  "/all ve/813448_2c6b9f9198054045a1581ee2c40854e8~mv2.avif",
  "/all ve/813448_51e85876ef8d4c218b0656aa565d8a96~mv2.avif",
  "/all ve/813448_43d67cb07c764ccea5a9345b91a5ea85~mv2.avif",
  "/all ve/813448_bc8a566324814e4cab8ff541ba3486af~mv2.avif",
  "/all ve/813448_ad81b4a4c66d40be89613a7ce9615329~mv2.avif",
];

// Duplicate for seamless loop
const duplicatedImages = [...vehicleImages, ...vehicleImages];

export function VehicleShowcase() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-white">
      {/* Section Title */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-black text-mysha-blue mb-4 uppercase tracking-tighter"
        >
          Our Fleet
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-mysha-blue/60 text-lg max-w-2xl mx-auto"
        >
          State-of-the-art vehicles equipped for all your transportation needs
        </motion.p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Images */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -vehicleImages.length * 400] }} // 400px per image + gap
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30, // 30 seconds for full loop
                ease: "linear",
              },
            }}
          >
            {duplicatedImages.map((image, index) => (
              <motion.div
                key={`${image}-${index}`}
                className="flex-shrink-0 relative group"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-80 h-60 md:w-96 md:h-72 overflow-hidden rounded-2xl">
                  <Image
                    src={image}
                    alt={`Vehicle ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Vehicle info on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 text-white"
                  >
                    <div className="text-sm font-bold uppercase tracking-wider mb-1">
                      Premium Vehicle
                    </div>
                    <div className="text-xs text-white/80">
                      Heavy-duty transportation solution
                    </div>
                  </motion.div>
                </div>
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <a
          href="/fleet"
          className="inline-flex items-center gap-3 px-8 py-4 bg-mysha-blue text-white font-black uppercase tracking-wider rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)]"
        >
          View Full Fleet
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
