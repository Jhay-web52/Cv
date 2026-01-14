"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const messages = [
  "Hello 👋",
  "नमस्ते 🙏",
  "Hola 👋",
  "Bonjour 👋",
  "PRABHULAL",
];

export default function PageLoader() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  // Mark hydration
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Language cycle
  useEffect(() => {
    if (!hydrated) return;

    if (index < messages.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 900);
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => setVisible(false), 1200);
      return () => clearTimeout(exitTimer);
    }
  }, [index, hydrated]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-bgDark text-textWhite">
      <AnimatePresence mode="wait">
        {/* STATIC TEXT — INSTANT, NO JS WAIT */}
        {!hydrated && (
          <motion.div
            key="static"
            className="text-3xl md:text-4xl font-semibold tracking-wide opacity-90"
          >
           Hey👋, glad you’re here 💫✨,
          </motion.div>
        )}

        {/* ANIMATED TEXT — AFTER JS LOAD */}
        {hydrated && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1], // pro easing
            }}
            className="text-3xl md:text-4xl font-semibold tracking-wide"
          >
            {messages[index]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow (optional but classy) */}
      <motion.div
        className="absolute h-40 w-40 rounded-full bg-textWhite/10 blur-3xl"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
