"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Truck, ArrowRight, Star, Shield, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { VehicleShowcase } from "@/components/home/VehicleShowcase";
import { useMemo, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Gallery carousel state and functions
const galleryImages = [
  "/GALLERY/813448_6a4e69bad9f241c7af3694e26e1892d2~mv2.avif",
  "/GALLERY/813448_4e2c6298014c498eb185b57f6dca352c~mv2.avif",
  "/GALLERY/813448_9515cb05edab4762baa7fc924787ca19~mv2.avif",
  "/GALLERY/813448_63844c9fcb2a48ab8f9b8159a5fee16c~mv2.avif",
  "/GALLERY/813448_a813e31eafeb4225982f24529fc54e71~mv2.avif",
  "/GALLERY/813448_d8b05ff851a543578be058415e662948~mv2.avif",
  "/GALLERY/813448_d9efb42c32fe482e8ca96b4150005c99~mv2.avif",
  "/GALLERY/277368316_510800913911784_2323857707811215500_n.jpg",
  "/GALLERY/277364588_1009030550031791_7091969809755119361_n.jpg",
  "/GALLERY/277393948_1143349662872368_6159340115907031385_n.jpg",
  "/GALLERY/277454231_640295893727545_7101566994651130122_n.jpg",
  "/GALLERY/277472581_375412774501646_950259269031912639_n.jpg",
  "/GALLERY/277480422_679171523327892_1551591217471729743_n.jpg",
  "/GALLERY/277602852_158714929867199_1209590829297484966_n.jpg"
];

function useGalleryCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return { currentImage, setCurrentImage, nextImage, previousImage };
}

function Truck3DModel() {
  const { scene } = useGLTF("/volvo_fh_16.glb");
  
  return (
    <primitive 
      object={scene} 
      scale={[0.8, 0.8, 0.8]}
      rotation={[0, -772.875, 0]}
      position={[0, -1, 0]}
    />
  );
}

function Truck3DScene() {
  return (
    <Canvas camera={{ position: [0, 5, -8], fov: 50 }} style={{ width: '100%', height: '100%' }}>
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

const vehicleCategoryCards = [
  {
    image: "/VEHICLES/grill-PhotoRoom_edited.avif",
    title: "Flat Bed Trailers",
    description: "Heavy-duty flatbed trailers for all your cargo needs",
    items: ["Flat Bed 40 Feet", "Flat Bed 50 Feet", "Flat Bed With Grill"],
  },
  {
    image: "/VEHICLES/pngegg.avif",
    title: "Pick-Up Trucks",
    description: "Versatile pick-up trucks for light to medium cargo",
    items: ["3 Tons Pick Ups", "7 Tons Pick Ups", "10 Tons Pick Ups"],
  },
  {
    image: "/VEHICLES/pngwing_edited.avif",
    title: "Heavy Truck Units",
    description: "Powerful truck units for heavy transportation",
    items: ["4-Wheel Units", "6-Wheel Units"],
  },
  {
    image: "/VEHICLES/volvo truck_edited.avif",
    title: "Box Trailers",
    description: "Enclosed box trailers for secure transportation",
    items: ["Box Trailer 40 Feet", "Box Trailer 50 Feet"],
  },
  {
    image: "/VEHICLES/pngwing_com.avif",
    title: "Low Bed Trailers",
    description: "Specialized low bed trailers for oversized cargo",
    items: ["Low Bed Trailer"],
  },
  {
    image: "/VEHICLES/flatbed.avif",
    title: "Specialized Trailers",
    description: "Custom trailers for specialized transportation needs",
    items: ["Specialized Equipment Trailer"],
  },
];

const stats = [
  { icon: Truck, value: "105+", label: "Total Vehicles", color: "from-blue-500 to-blue-600" },
  { icon: Shield, value: "100%", label: "Safety Certified", color: "from-green-500 to-green-600" },
  { icon: Clock, value: "24/7", label: "Available", color: "from-purple-500 to-purple-600" },
  { icon: Star, value: "4.9", label: "Client Rating", color: "from-orange-500 to-orange-600" }
];

export default function FleetPage() {
  const [activeCategoryTitle, setActiveCategoryTitle] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const { currentImage, setCurrentImage, nextImage, previousImage } = useGalleryCarousel();

  const activeCategory = useMemo(
    () => vehicleCategoryCards.find((c) => c.title === activeCategoryTitle) ?? null,
    [activeCategoryTitle]
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleViewDetails = (category: any) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  return (
    <div className="flex flex-col">
      {/* Enhanced Hero Section with Stats */}
      <section className="relative pt-4 pb-5 bg-mysha-blue overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl">
            {/* Hero Content with 3D Model */}
            <div className="flex flex-col lg:flex-row gap-50 items-center">
              <div className="flex-1 lg:flex-none lg:w-2/4">
                <ScrollReveal>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 leading-[0.9] tracking-tight uppercase">
                    Our Premium
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Fleet
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-4xl leading-relaxed">
                    State-of-the-art vehicles equipped for any transportation challenge across the UAE and GCC.
                  </p>
                </ScrollReveal>

                {/* Animated Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <ScrollReveal key={stat.label} delay={0.3 + index * 0.1}>
                      <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="relative group"
                      >
                        <div className="relative p-6 bg-white/[0.08] backdrop-blur-xl rounded-3xl border border-white/15 text-center shadow-[0_18px_60px_rgba(0,0,0,0.25)] overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                            className={`absolute -inset-10 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-15 rounded-full blur-2xl transition-opacity duration-300`}
                          />

                          <div className="relative z-10">
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.12 }}
                              transition={{ duration: 0.6 }}
                              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center"
                            >
                              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                              className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2"
                            >
                              {stat.value}
                            </motion.div>
                            <div className="text-xs text-white/70 uppercase tracking-wider">{stat.label}</div>
                          </div>
                        </div>
                        
                        {/* Glow Effect */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className={`absolute -inset-1 bg-gradient-to-r ${stat.color} rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-300`}
                        />
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
              
              {/* 3D Truck Model - Hidden on Mobile */}
              <div className="hidden lg:block flex-1 lg:flex-none lg:w-3/4 ml-auto lg:ml-16">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="w-full h-[700px]"
                >
                  <Truck3DScene />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Cinematic Bottom Shadow */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-mysha-blue to-transparent z-10" />
      </section>

      {/* Vehicle Showcase Section from Home Page */}
      <VehicleShowcase />

      {/* Modern Vehicle Categories Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_35%,rgba(255,255,255,0.10)_0%,transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-20 text-center flex flex-col items-center">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-display font-black text-white mb-6 uppercase tracking-tighter text-center"
                style={{ lineHeight: "1.1" }}
              >
                Our Vehicle
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  Categories
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light text-center"
              >
                From 3-ton pick-ups to 80-ton 6-wheel units and flat-bed to box trailers — a diverse fleet for every need.
              </motion.p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {vehicleCategoryCards.map((cat, index) => (
              <ScrollReveal key={cat.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white rounded-3xl shadow-[0_18px_60px_rgba(0,0,0,0.28)] hover:shadow-[0_28px_90px_rgba(0,0,0,0.38)] transition-all duration-500 overflow-hidden border border-white/15"
                >
                  {/* Gradient Border on Hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-mysha-blue/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-7">
                    <div className="relative h-64 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        className="object-contain p-6"
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <h3 className="text-2xl font-bold text-mysha-blue leading-tight">
                        {cat.title}
                      </h3>
                      <div className="mt-3 text-sm text-mysha-blue/70 leading-relaxed max-w-sm mx-auto">
                        {cat.description}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {cat.items.map((item, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                          className="px-3 py-1.5 rounded-full bg-mysha-blue/5 border border-mysha-blue/10 text-xs font-semibold text-mysha-blue/80"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => handleViewDetails(cat)}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-7 w-full bg-mysha-blue text-white py-4 rounded-2xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-all duration-300"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Details Modal */}
          <AnimatePresence>
            {showModal && selectedCategory && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={closeModal}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-[0_30px_120px_rgba(0,0,0,0.45)] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="relative h-64 bg-gradient-to-br from-mysha-blue to-blue-600">
                    <div className="absolute inset-0 bg-black/20" />
                    <motion.button
                      onClick={closeModal}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5 rotate-45" />
                    </motion.button>
                    <div className="relative h-full flex items-center justify-center">
                      <Image
                        src={selectedCategory.image}
                        alt={selectedCategory.title}
                        width={200}
                        height={200}
                        className="object-contain filter drop-shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-8 md:p-12">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl md:text-4xl font-display font-black text-mysha-blue mb-4">
                        {selectedCategory.title}
                      </h2>
                      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        {selectedCategory.description}
                      </p>
                    </div>

                    {/* Vehicle Items */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-mysha-blue mb-4">Available Options:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {selectedCategory.items.map((item: string, i: number) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="flex items-center gap-3 p-3 bg-mysha-blue/5 rounded-xl border border-mysha-blue/10"
                          >
                            <CheckCircle className="w-5 h-5 text-mysha-blue flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-700">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.a
                        href={`/contact?category=${encodeURIComponent(selectedCategory.title)}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-mysha-blue text-white font-black uppercase tracking-wider rounded-2xl text-sm text-center transition-all duration-300"
                      >
                        Get Quote
                      </motion.a>
                      <motion.button
                        onClick={closeModal}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-gray-100 text-gray-700 font-black uppercase tracking-wider rounded-2xl text-sm text-center transition-all duration-300"
                      >
                        Close
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Insane CTA Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white relative">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_26%,transparent_27%,transparent_74%,rgba(59,130,246,0.05)_75%,rgba(59,130,246,0.05)_76%,transparent_77%,transparent)] bg-[length:60px_60px]" />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: [null, Math.random() * 100 - 50, Math.random() * 100 - 50],
                y: [null, Math.random() * 100 - 50, Math.random() * 100 - 50],
                scale: [0, 1, 1, 0],
                opacity: [0, 0.4, 0.4, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 bg-mysha-blue/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-r from-mysha-blue/20 to-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-mysha-blue/20 rounded-full blur-3xl"
        />

        {/* Content */}
        <div className="container mx-auto px-6 relative z-20">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 100, rotateX: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, type: "spring" }}
              className="text-center max-w-6xl mx-auto"
            >
              {/* Animated Heading */}
              <motion.h2 
                className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-8 uppercase tracking-tighter relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative inline-block"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-mysha-blue via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Ready to Move Your Cargo?
                  </span>
                  <span className="relative bg-gradient-to-r from-mysha-blue via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Ready to Move Your Cargo?
                  </span>
                </motion.span>
                
                {/* Animated Underline */}
                <motion.div
                  animate={{
                    width: ["0%", "100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-mysha-blue to-cyan-500 rounded-full"
                />
              </motion.h2>

              {/* Animated Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-700 mb-16 leading-relaxed font-light"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="bg-gradient-to-r from-gray-700 via-mysha-blue to-cyan-500 bg-clip-text text-transparent"
                >
                  Get a personalized quote for your transportation needs. Our expert team is ready to assist you 24/7.
                </motion.span>
              </motion.p>
              
              {/* Insane Button Container */}
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* Primary Button */}
                <motion.a
                  href="/contact"
                  whileHover={{ 
                    scale: 1.1,
                    rotateY: 15,
                    boxShadow: "0 25px 50px rgba(59,130,246,0.4), 0 0 100px rgba(59,130,246,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-16 py-8 bg-gradient-to-r from-mysha-blue to-blue-600 text-white font-black text-xl font-bold uppercase tracking-widest rounded-full transition-all duration-500 overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Button Background Animation */}
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-400/30"
                  />
                  
                  {/* Button Text */}
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </motion.span>
                    Get Instant Quote
                  </span>
                  
                  {/* Button Glow */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-mysha-blue/20 blur-xl"
                  />
                </motion.a>

                {/* Secondary Button */}
                <motion.a
                  href="tel:+971557796387"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: -15,
                    borderColor: "rgba(59,130,246,0.8)",
                    boxShadow: "0 20px 40px rgba(59,130,246,0.3), 0 0 80px rgba(59,130,246,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-16 py-8 border-2 border-mysha-blue text-mysha-blue text-xl font-bold uppercase tracking-widest rounded-full transition-all duration-500 overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Button Background Animation */}
                  <motion.div
                    animate={{
                      x: ["100%", "-100%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-mysha-blue/10 to-transparent"
                  />
                  
                  {/* Button Text */}
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.span
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.447-.89l3.066 3.066A1 1 0 0110.894.447l3.066-3.066A1 1 0 0118 8.618V6a2 2 0 012-2h3.28a1 1 0 01.447-.89l3.066-3.066A1 1 0 0110.894-.447L8.618 6.612V8a2 2 0 01-2 2H3.28a1 1 0 01-.447.89l-3.066 3.066A1 1 0 012 8.618V6z" />
                      </svg>
                    </motion.span>
                    Call Us Now
                  </span>
                  
                  {/* Button Glow */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-mysha-blue/10 blur-xl"
                  />
                </motion.a>
              </motion.div>

              {/* Floating Elements */}
              <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-20">
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-16 h-16 bg-gradient-to-r from-mysha-blue to-cyan-500 rounded-full flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4 4m0 0l4 4m-4-4h4m-4 0l4 4" />
                  </svg>
                </motion.div>
              </div>

              <div className="absolute top-0 right-1/4 translate-x-1/2 -translate-y-16">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Bottom Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.10)_0%,transparent_60%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-display font-black text-white mb-6 uppercase tracking-tighter"
              >
                Our Fleet
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  Gallery
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Explore our premium fleet in action - delivering excellence across the UAE and GCC region with state-of-the-art vehicles and professional service.
              </motion.p>
            </div>
          </ScrollReveal>

          {/* Gallery Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={galleryImages[currentImage]}
                    alt={`Fleet vehicle ${currentImage + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-2">
                        Premium Fleet Vehicle
                      </h3>
                      <p className="text-white/80 text-lg">
                        Vehicle #{currentImage + 1} of {galleryImages.length}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-mysha-blue group-hover:translate-x-[-2px] transition-transform duration-300" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-mysha-blue group-hover:translate-x-[2px] transition-transform duration-300" />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2 mt-6 overflow-x-auto pb-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                    currentImage === index 
                      ? 'ring-2 ring-mysha-blue scale-110 shadow-lg' 
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <Image
                    src={galleryImages[index]}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Image Counter */}
            <div className="text-center mt-4">
              <p className="text-gray-400 font-medium">
                {currentImage + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
