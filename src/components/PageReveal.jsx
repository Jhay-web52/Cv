"use client";

import { motion } from "framer-motion";

export default function PageReveal({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1], // premium easing
      }}
    >
      {children}
    </motion.div>
  );
}
