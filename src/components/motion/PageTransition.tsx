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
        {/* Cinematic Wipe */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-mysha-blue origin-top flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4">
              <div className="w-8 h-8 border-4 border-primary rounded-lg" />
            </div>
            <span className="text-white font-display text-2xl font-black tracking-tighter">MYSHA</span>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="fixed inset-0 z-[100] bg-mysha-blue origin-bottom flex items-center justify-center"
        >
           <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4">
              <div className="w-8 h-8 border-4 border-primary rounded-lg" />
            </div>
            <span className="text-white font-display text-2xl font-black tracking-tighter">MYSHA</span>
          </motion.div>
        </motion.div>

        {/* Content Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
