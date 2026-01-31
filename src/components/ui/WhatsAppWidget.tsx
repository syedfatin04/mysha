"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";

export function WhatsAppWidget() {
  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      <Magnetic>
        <motion.a
          href="https://wa.me/971557796387"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all duration-300 group relative"
        >
          <MessageSquare className="w-8 h-8" />
          
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-black text-sm font-bold rounded-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap shadow-xl border border-gray-100">
            Chat with us
          </span>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
          />
        </motion.a>
      </Magnetic>
    </div>
  );
}
