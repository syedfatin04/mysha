"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Initial Page Cover - Prevents page from showing initially */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          className="fixed inset-0 z-[99] bg-mysha-blue origin-top"
        />
        
        {/* Cinematic Wipe */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-mysha-blue origin-top flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
              <img src="/GALLERY/dsd-removebg-preview.png" alt="MYSHA Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            </div>
            <span className="text-white font-display text-xl sm:text-2xl font-black tracking-tighter">MYSHA</span>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.02 }}
          className="fixed inset-0 z-[100] bg-mysha-blue origin-bottom flex items-center justify-center"
        >
           <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
              <img src="/GALLERY/dsd-removebg-preview.png" alt="MYSHA Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            </div>
            <span className="text-white font-display text-xl sm:text-2xl font-black tracking-tighter">MYSHA</span>
          </motion.div>
        </motion.div>

        {/* Content Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
