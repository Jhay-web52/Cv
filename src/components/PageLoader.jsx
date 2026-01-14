"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

export default function PageLoader() {
  const name = "PRABHULAL";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bgDark text-textWhite"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.8, duration: 1.2, ease: "easeInOut" }}
    >
      {/* Name Animation */}
      <motion.div
        className="flex text-4xl font-bold tracking-[0.3em]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {name.split("").map((char, index) => (
          <motion.span key={index} variants={letter}>
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Underline */}
      <motion.div
        className="mt-6 h-[2px] w-24 bg-textWhite/70 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 1.2,
          duration: 1,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "left" }}
      />

      {/* Subtle glow */}
      <motion.div
        className="absolute h-32 w-32 rounded-full bg-textWhite/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
